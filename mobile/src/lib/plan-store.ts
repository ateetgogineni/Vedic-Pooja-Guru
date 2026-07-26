// Persistence for the one fully-functional flow (headcount plan + checklist
// check-state). When Supabase is configured and the user is signed in, data
// is saved to Postgres (see ../../schema.sql) and RLS-scoped to auth.uid().
// Otherwise (Supabase not configured yet, or browsing as guest) the same
// shape is persisted to AsyncStorage so the flow is still fully testable
// end-to-end before the backend is wired up.
import AsyncStorage from '@react-native-async-storage/async-storage';

import { isSupabaseConfigured, supabase } from '@/lib/supabase';
import type { PlanningOptions } from '@/data/poojas';

const localKey = (scope: string, poojaId: string, suffix: string) => `vedic-vidhi.${scope}.${poojaId}.${suffix}`;

function scopeFor(userId: string | null) {
  return userId ?? 'guest';
}

export async function savePlanningOptions(userId: string | null, poojaId: string, opts: PlanningOptions) {
  if (isSupabaseConfigured && userId) {
    const { error } = await supabase.from('pooja_plans').upsert(
      {
        user_id: userId,
        pooja_id: poojaId,
        headcount: opts.headcount,
        include_children: opts.includeChildren,
        extended_family: opts.extendedFamily,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id,pooja_id' },
    );
    if (error) console.warn('[plan-store] supabase upsert failed, falling back to local storage', error.message);
    else return;
  }
  await AsyncStorage.setItem(localKey(scopeFor(userId), poojaId, 'plan'), JSON.stringify(opts));
}

export async function loadPlanningOptions(userId: string | null, poojaId: string): Promise<PlanningOptions | null> {
  if (isSupabaseConfigured && userId) {
    const { data, error } = await supabase
      .from('pooja_plans')
      .select('headcount, include_children, extended_family')
      .eq('user_id', userId)
      .eq('pooja_id', poojaId)
      .maybeSingle();
    if (!error && data) {
      return { headcount: data.headcount, includeChildren: data.include_children, extendedFamily: data.extended_family };
    }
  }
  const raw = await AsyncStorage.getItem(localKey(scopeFor(userId), poojaId, 'plan'));
  return raw ? JSON.parse(raw) : null;
}

export async function saveChecklistState(userId: string | null, poojaId: string, state: Record<string, boolean>) {
  if (isSupabaseConfigured && userId) {
    const rows = Object.entries(state).map(([item_key, is_checked]) => ({
      user_id: userId,
      pooja_id: poojaId,
      item_key,
      is_checked,
      updated_at: new Date().toISOString(),
    }));
    if (rows.length > 0) {
      const { error } = await supabase.from('checklist_state').upsert(rows, { onConflict: 'user_id,pooja_id,item_key' });
      if (error) console.warn('[plan-store] supabase checklist upsert failed, falling back to local storage', error.message);
      else return;
    }
  }
  await AsyncStorage.setItem(localKey(scopeFor(userId), poojaId, 'checklist'), JSON.stringify(state));
}

export async function loadChecklistState(userId: string | null, poojaId: string): Promise<Record<string, boolean>> {
  if (isSupabaseConfigured && userId) {
    const { data, error } = await supabase
      .from('checklist_state')
      .select('item_key, is_checked')
      .eq('user_id', userId)
      .eq('pooja_id', poojaId);
    if (!error && data) {
      return Object.fromEntries(data.map((row) => [row.item_key, row.is_checked]));
    }
  }
  const raw = await AsyncStorage.getItem(localKey(scopeFor(userId), poojaId, 'checklist'));
  return raw ? JSON.parse(raw) : {};
}

import { useRef, useState } from 'react';
import { Alert, FlatList, KeyboardAvoidingView, Platform, Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Icon } from '@/components/ui/icon';
import { TextField } from '@/components/ui/text-field';
import { TopBar } from '@/components/ui/top-bar';
import { Radius, Spacing } from '@/constants/theme';
import { getPoojaById, localize } from '@/data/poojas';
import { usePrefs } from '@/lib/prefs-context';
import { useAppTheme } from '@/lib/theme-context';
import { useAppRoute } from '@/navigation/hooks';

type Message = { id: string; from: 'user' | 'assistant'; text: string };

const CANNED: { match: RegExp; reply: string }[] = [
  { match: /mango leaves|torana/i, reply: 'You can use betel leaves as a common substitute, or simply offer an extra flower with devotion.' },
  { match: /late|delay|time/i, reply: 'It is generally fine to start a little later than the suggested muhurat — devotion and sincerity matter most. For strict timing needs, consult a priest.' },
  { match: /kalash|substitute/i, reply: 'A steel or brass pot filled with water works well if you do not have a traditional kalash.' },
  { match: /how many|quantity|flowers|modak/i, reply: 'Exact quantities for your headcount are on the Item Checklist screen — they update automatically as you change your participant count.' },
];

const SUGGESTIONS = ['Is it okay to start late?', 'Alternative for Kalash?'];

export function ChatScreen() {
  const { colors } = useAppTheme();
  const { languageCode } = usePrefs();
  const { id, step } = useAppRoute('Chat').params;
  const pooja = getPoojaById(id);
  const listRef = useRef<FlatList<Message>>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'seed',
      from: 'assistant',
      text: `Namaste! Ask me anything about ${pooja ? localize(pooja.name, languageCode) : 'your pooja'} — item substitutes, timing, or what a step means.`,
    },
  ]);
  const [input, setInput] = useState('');

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const userMsg: Message = { id: `${Date.now()}-u`, from: 'user', text: trimmed };
    const found = CANNED.find((c) => c.match.test(trimmed));
    const reply =
      found?.reply ??
      'I want to make sure that answer is grounded and accurate. For questions outside what I can verify, please consult a priest — full AI guidance is coming in a future update.';
    const assistantMsg: Message = { id: `${Date.now()}-a`, from: 'assistant', text: reply };
    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setInput('');
    requestAnimationFrame(() => listRef.current?.scrollToEnd({ animated: true }));
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <TopBar title="Vedic Vidhi" />
      {step ? (
        <View style={[styles.banner, { backgroundColor: colors.surfaceContainer, borderBottomColor: colors.softSand }]}>
          <Icon name="info" color={colors.primaryContainer} size={18} />
          <AppText variant="labelSm" color="primary" style={{ letterSpacing: 1 }}>
            CURRENT STEP: {step.toString().toUpperCase()}
          </AppText>
        </View>
      ) : null}

      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={(m) => m.id}
        contentContainerStyle={styles.list}
        style={{ backgroundColor: colors.warmIvory }}
        renderItem={({ item }) => (
          <View style={[styles.bubbleRow, item.from === 'user' && styles.bubbleRowUser]}>
            <View
              style={[
                styles.bubble,
                item.from === 'user'
                  ? { backgroundColor: colors.surfaceContainer, borderColor: colors.surfaceDim }
                  : { backgroundColor: colors.softSand, borderLeftColor: colors.sacredGreen, borderLeftWidth: 4 },
              ]}
            >
              <AppText variant="bodyMd">{item.text}</AppText>
            </View>
          </View>
        )}
      />

      <View style={[styles.inputArea, { backgroundColor: colors.surfaceContainerLowest, borderTopColor: colors.softSand }]}>
        <FlatList
          data={SUGGESTIONS}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(s) => s}
          contentContainerStyle={{ gap: 12, paddingBottom: 12 }}
          renderItem={({ item }) => (
            <Pressable onPress={() => send(item)} style={[styles.chip, { borderColor: colors.primaryContainer }]}>
              <AppText variant="labelSm" color="primaryContainer">
                {item}
              </AppText>
            </Pressable>
          )}
        />
        <View style={styles.inputRow}>
          <View style={{ flex: 1 }}>
            <TextField label="" placeholder="Type your question…" value={input} onChangeText={setInput} onSubmitEditing={() => send(input)} />
          </View>
          <Pressable onPress={() => send(input)} style={[styles.sendBtn, { backgroundColor: colors.primaryContainer }]}>
            <Icon name="send" color={colors.onPrimary} size={22} />
          </Pressable>
          <Pressable
            onPress={() => Alert.alert('Coming soon', 'Voice input will be available in a future update.')}
            style={[styles.micBtn, { backgroundColor: colors.primaryContainer }]}
          >
            <Icon name="mic" color={colors.onPrimary} size={26} />
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  banner: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 10, borderBottomWidth: StyleSheet.hairlineWidth },
  list: { padding: Spacing.marginMobile, gap: Spacing.stackMd },
  bubbleRow: { flexDirection: 'row', justifyContent: 'flex-start' },
  bubbleRowUser: { justifyContent: 'flex-end' },
  bubble: { maxWidth: '85%', borderRadius: 18, borderWidth: 1, padding: 14 },
  inputArea: { padding: Spacing.marginMobile, borderTopWidth: StyleSheet.hairlineWidth },
  chip: { borderWidth: 2, borderRadius: Radius.full, paddingHorizontal: 16, paddingVertical: 8 },
  inputRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.gutter },
  sendBtn: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  micBtn: { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center' },
});

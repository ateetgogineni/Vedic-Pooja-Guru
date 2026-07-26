import { useRef, useState } from 'react';
import { Alert, FlatList, KeyboardAvoidingView, Platform, Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText } from '@/components/ui/app-text';
import { Icon } from '@/components/ui/icon';
import { TextField } from '@/components/ui/text-field';
import { TopBar } from '@/components/ui/top-bar';
import { Radius, Spacing } from '@/constants/theme';
import { getPoojaById, localize } from '@/data/poojas';
import { type StringKey, useTranslation } from '@/lib/i18n';
import { useAppTheme } from '@/lib/theme-context';
import { useAppRoute } from '@/navigation/hooks';

type Message = { id: string; from: 'user' | 'assistant'; text: string };

const CANNED: { match: RegExp; replyKey: StringKey }[] = [
  { match: /mango leaves|torana/i, replyKey: 'chat.cannedMangoLeaves' },
  { match: /late|delay|time/i, replyKey: 'chat.cannedLate' },
  { match: /kalash|substitute/i, replyKey: 'chat.cannedKalash' },
  { match: /how many|quantity|flowers|modak/i, replyKey: 'chat.cannedQuantity' },
];

export function ChatScreen() {
  const { colors } = useAppTheme();
  const { t, languageCode } = useTranslation();
  const { id, step } = useAppRoute('Chat').params;
  const pooja = getPoojaById(id);
  const listRef = useRef<FlatList<Message>>(null);
  const SUGGESTIONS = [t('chat.suggestion1'), t('chat.suggestion2')];

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'seed',
      from: 'assistant',
      text: t('chat.seed', { name: pooja ? localize(pooja.name, languageCode) : t('chat.yourPooja') }),
    },
  ]);
  const [input, setInput] = useState('');

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const userMsg: Message = { id: `${Date.now()}-u`, from: 'user', text: trimmed };
    const found = CANNED.find((c) => c.match.test(trimmed));
    const reply = t(found?.replyKey ?? 'chat.fallbackReply');
    const assistantMsg: Message = { id: `${Date.now()}-a`, from: 'assistant', text: reply };
    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setInput('');
    requestAnimationFrame(() => listRef.current?.scrollToEnd({ animated: true }));
  };

  return (
    <SafeAreaView edges={['top', 'bottom']} style={{ flex: 1, backgroundColor: colors.warmIvory }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <TopBar title="Vedic Pooja Guru" />
      {step ? (
        <View style={[styles.banner, { backgroundColor: colors.surfaceContainer, borderBottomColor: colors.softSand }]}>
          <Icon name="info" color={colors.primaryContainer} size={18} />
          <AppText variant="labelSm" color="primary" style={{ letterSpacing: 1 }}>
            {t('chat.currentStep', { step: step.toString().toUpperCase() })}
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
            <TextField label="" placeholder={t('chat.placeholder')} value={input} onChangeText={setInput} onSubmitEditing={() => send(input)} />
          </View>
          <Pressable onPress={() => send(input)} style={[styles.sendBtn, { backgroundColor: colors.primaryContainer }]}>
            <Icon name="send" color={colors.onPrimary} size={22} />
          </Pressable>
          <Pressable
            onPress={() => Alert.alert(t('common.comingSoon'), t('chat.voiceComingSoonBody'))}
            style={[styles.micBtn, { backgroundColor: colors.primaryContainer }]}
          >
            <Icon name="mic" color={colors.onPrimary} size={26} />
          </Pressable>
        </View>
      </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
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

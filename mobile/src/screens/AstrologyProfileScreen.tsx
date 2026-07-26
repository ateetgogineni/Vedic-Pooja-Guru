import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Button } from '@/components/ui/button';
import { Screen } from '@/components/ui/screen';
import { TextField } from '@/components/ui/text-field';
import { TopBar } from '@/components/ui/top-bar';
import { Radius, Spacing } from '@/constants/theme';
import { RASHIS } from '@/data/astrology';
import { useTranslation } from '@/lib/i18n';
import { useAstrologyProfile } from '@/lib/astrology-context';
import { NAKSHATRAS } from '@/lib/panchangam-sample';
import { useAppTheme } from '@/lib/theme-context';
import { useAppNavigation } from '@/navigation/hooks';

function Chip({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
  const { colors } = useAppTheme();
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.chip,
        {
          backgroundColor: selected ? colors.primaryContainer : colors.surfaceContainerLow,
          borderColor: selected ? colors.primaryContainer : colors.outlineVariant,
        },
      ]}
    >
      <AppText variant="labelSm" style={{ color: selected ? colors.onPrimary : colors.onSurfaceVariant }}>
        {label}
      </AppText>
    </Pressable>
  );
}

export function AstrologyProfileScreen() {
  const { t } = useTranslation();
  const navigation = useAppNavigation();
  const { profile, setProfile } = useAstrologyProfile();
  const [rashi, setRashi] = useState(profile.rashi);
  const [nakshatra, setNakshatra] = useState(profile.nakshatra);
  const [dob, setDob] = useState(profile.dob);
  const [birthPlace, setBirthPlace] = useState(profile.birthPlace);

  const onSave = () => {
    setProfile({ rashi, nakshatra, dob, birthPlace });
    navigation.goBack();
  };

  return (
    <Screen scroll edges={['top', 'bottom']} contentStyle={styles.content}>
      <TopBar title={t('astrology.title')} />
      <AppText variant="bodyMd" color="onSurfaceVariant">
        {t('astrology.subtitle')}
      </AppText>

      <View style={{ gap: 8 }}>
        <AppText variant="labelSm" color="onSurfaceVariant">
          {t('astrology.rashi')}
        </AppText>
        <View style={styles.chipWrap}>
          {RASHIS.map((r) => (
            <Chip key={r} label={r} selected={rashi === r} onPress={() => setRashi(r)} />
          ))}
        </View>
      </View>

      <View style={{ gap: 8 }}>
        <AppText variant="labelSm" color="onSurfaceVariant">
          {t('astrology.star')}
        </AppText>
        <View style={styles.chipWrap}>
          {NAKSHATRAS.map((n) => (
            <Chip key={n} label={n} selected={nakshatra === n} onPress={() => setNakshatra(n)} />
          ))}
        </View>
      </View>

      <TextField
        label={t('astrology.dob')}
        placeholder={t('astrology.dobPlaceholder')}
        value={dob}
        onChangeText={setDob}
        keyboardType="numbers-and-punctuation"
      />
      <TextField
        label={t('astrology.placeOfBirth')}
        placeholder={t('astrology.placePlaceholder')}
        value={birthPlace}
        onChangeText={setBirthPlace}
      />

      <Button label={t('common.save')} onPress={onSave} />

      <AppText variant="labelSm" color="onSurfaceVariant" center>
        {t('astrology.disclaimer')}
      </AppText>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: Spacing.marginMobile, gap: Spacing.stackMd },
  chipWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: Radius.full, borderWidth: 1 },
});

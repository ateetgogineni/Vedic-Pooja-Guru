import { useMemo, useState } from 'react';
import { Alert, Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText } from '@/components/ui/app-text';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { TextField } from '@/components/ui/text-field';
import { Radius, Spacing } from '@/constants/theme';
import { localize, poojas } from '@/data/poojas';
import { useTranslation } from '@/lib/i18n';
import { useAppTheme } from '@/lib/theme-context';
import { useAppNavigation } from '@/navigation/hooks';

export function LibraryScreen() {
  const { colors } = useAppTheme();
  const { t, languageCode } = useTranslation();
  const navigation = useAppNavigation();
  const [query, setQuery] = useState('');
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const closeUploadModal = () => {
    setUploadModalOpen(false);
    setExpanded(false);
    setSelectedFile(null);
  };

  const chooseFile = () => {
    // TODO: integrate a real native document picker (e.g. react-native-document-picker
    // or @react-native-documents/picker) scoped to `application/pdf` and store the
    // picked file's uri/name here. Simulating a picked file for now so the rest of
    // this UI flow (enabling Upload, confirmation) can be exercised end-to-end.
    setSelectedFile('my-family-pooja-vidhi.pdf');
  };

  const uploadFile = () => {
    // TODO: upload the selected PDF to the backend, have it parsed and handed to
    // the AI/RAG pipeline (see docs/PRD.md's AI service) to extract the vidhi
    // steps, mantras, and item list, then create a draft custom pooja from it —
    // pending priest verification before it's usable, per the PRD's trust
    // requirement. None of that backend/AI work is wired up yet.
    Alert.alert(t('library.uploadedTitle'), t('library.uploadedBody'));
    closeUploadModal();
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return poojas;
    return poojas.filter((p) => {
      const name = localize(p.name, languageCode).toLowerCase();
      const tagline = localize(p.tagline, languageCode).toLowerCase();
      return name.includes(q) || tagline.includes(q);
    });
  }, [query, languageCode]);

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.surfaceContainer }]}>
        <AppText variant="mantraDisplay" color="primary">
          Vedic Pooja Guru
        </AppText>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View>
          <AppText variant="headlineLgMobile">{t('library.title')}</AppText>
          <AppText variant="bodyMd" color="onSurfaceVariant" style={{ marginTop: 4 }}>
            {t('library.subtitle')}
          </AppText>
        </View>

        <TextField placeholder={t('library.searchPlaceholder')} value={query} onChangeText={setQuery} />

        <Pressable
          onPress={() => setUploadModalOpen(true)}
          style={[styles.addPoojaBtn, { borderColor: colors.primaryContainer }]}
        >
          <Icon name="add" color={colors.primaryContainer} size={20} />
          <AppText variant="bodyLg" color="primaryContainer" style={{ fontWeight: '600' }}>
            {t('library.addPooja')}
          </AppText>
        </Pressable>

        <AppText variant="labelSm" color="onSurfaceVariant">
          {t('library.count', { count: filtered.length })}
        </AppText>

        {filtered.length === 0 ? (
          <AppText variant="bodyMd" color="onSurfaceVariant" center style={{ marginTop: Spacing.stackMd }}>
            {t('library.noResults')}
          </AppText>
        ) : (
          filtered.map((p) => {
            const hasContent = p.items.length > 0 && p.steps.length > 0;
            return (
              <Pressable
                key={p.id}
                onPress={() => navigation.navigate('PoojaDetail', { id: p.id })}
                style={[styles.card, { backgroundColor: colors.softSand, borderColor: colors.outlineVariant }]}
              >
                <View style={[styles.iconWrap, { backgroundColor: colors.surfaceContainerHighest }]}>
                  <Icon name={p.icon} color={colors.primaryContainer} size={28} />
                </View>
                <View style={{ flex: 1, gap: 4 }}>
                  <AppText variant="labelSm" color="sacredGreen">
                    {localize(p.tagline, languageCode).toUpperCase()}
                  </AppText>
                  <AppText variant="bodyLg" style={{ fontWeight: '600' }}>
                    {localize(p.name, languageCode)}
                  </AppText>
                  <AppText variant="bodyMd" color="onSurfaceVariant" numberOfLines={2}>
                    {localize(p.description, languageCode)}
                  </AppText>
                  <View style={styles.metaRow}>
                    <Icon name="schedule" color={colors.onSurfaceVariant} size={14} />
                    <AppText variant="labelSm" color="onSurfaceVariant">
                      {localize(p.durationLabel, languageCode)}
                    </AppText>
                    {!hasContent ? (
                      <AppText variant="labelSm" color="muhuratAmber" style={{ marginLeft: 8 }}>
                        {t('library.comingSoon')}
                      </AppText>
                    ) : null}
                  </View>
                </View>
                <Icon name="chevron-right" color={colors.onSurfaceVariant} size={22} />
              </Pressable>
            );
          })
        )}
      </ScrollView>

      <Modal visible={uploadModalOpen} animationType="slide" transparent onRequestClose={closeUploadModal}>
        <View style={styles.modalBackdrop}>
          <View style={[styles.modalSheet, { backgroundColor: colors.background }]}>
            <View style={styles.modalHeader}>
              <AppText variant="headlineMd">{t('library.addPooja')}</AppText>
              <Pressable onPress={closeUploadModal} hitSlop={8}>
                <Icon name="close" color={colors.onSurfaceVariant} size={24} />
              </Pressable>
            </View>

            <Pressable onPress={() => setExpanded((e) => !e)} style={styles.modalPromptRow}>
              <AppText variant="bodyMd" color="onSurfaceVariant" style={{ flex: 1 }}>
                {t('library.uploadPrompt')}
              </AppText>
              <Icon name={expanded ? 'expand-less' : 'expand-more'} color={colors.primary} size={24} />
            </Pressable>

            {expanded ? (
              <View style={{ gap: Spacing.stackMd }}>
                <Pressable
                  onPress={chooseFile}
                  style={[styles.uploadBox, { borderColor: colors.outlineVariant, backgroundColor: colors.softSand }]}
                >
                  <Icon name="upload-file" color={colors.primary} size={28} />
                  <AppText variant="bodyMd" color={selectedFile ? undefined : 'onSurfaceVariant'} center>
                    {selectedFile ?? t('library.choosePdf')}
                  </AppText>
                </Pressable>
                <Button label={t('library.upload')} onPress={uploadFile} disabled={!selectedFile} />
              </View>
            ) : null}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.marginMobile,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  content: { padding: Spacing.marginMobile, gap: Spacing.gutter, paddingBottom: 48 },
  card: { flexDirection: 'row', alignItems: 'center', gap: Spacing.gutter, borderRadius: Radius.xl, borderWidth: 1, padding: Spacing.gutter },
  iconWrap: { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center' },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  addPoojaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: Radius.lg,
    paddingVertical: 12,
  },
  modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  modalSheet: {
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    padding: Spacing.marginMobile,
    gap: Spacing.stackMd,
  },
  modalHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  modalPromptRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.gutter },
  uploadBox: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: Radius.lg,
    paddingVertical: Spacing.stackLg,
    alignItems: 'center',
    gap: 8,
  },
});

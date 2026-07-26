// App-wide UI string translations, separate from pooja ritual content
// (see @/data/poojas for that). Telugu ('te') strings are a provisional
// draft translation — not yet reviewed by a native speaker — and, like
// the rest of this prototype's content, should not be treated as final
// copy. Other language codes in prefs-context's LANGUAGES list fall back
// to English here until they're populated.
import { usePrefs } from '@/lib/prefs-context';

export type Localized = { en: string; te?: string };

export function localize(text: Localized, languageCode: string): string {
  if (languageCode === 'te' && text.te) return text.te;
  return text.en;
}

const STRINGS = {
  'common.save': { en: 'Save', te: 'సేవ్ చేయండి' },
  'common.continue': { en: 'Continue', te: 'కొనసాగించండి' },
  'common.comingSoon': { en: 'Coming soon', te: 'త్వరలో వస్తుంది' },

  'splash.tagline': { en: 'Your Virtual Priest’s Assistant', te: 'మీ వర్చువల్ పురోహిత సహాయకుడు' },
  'splash.preparing': { en: 'PREPARING SANCTUARY', te: 'ఆలయాన్ని సిద్ధం చేస్తోంది' },

  'onboarding.skip': { en: 'SKIP', te: 'దాటవేయి' },
  'onboarding.slide1Title': { en: 'Guided by AI, rooted in tradition', te: 'AI మార్గదర్శకత్వం, సంప్రదాయంలో పాతుకుపోయింది' },
  'onboarding.slide1Body': {
    en: 'A virtual priest’s assistant that walks you through every step, grounded in verified vidhi — never improvised.',
    te: 'ప్రతి అడుగులో మిమ్మల్ని నడిపించే వర్చువల్ పురోహిత సహాయకుడు, ధృవీకరించిన విధి ఆధారంగా — ఎప్పుడూ సొంతంగా కల్పించినది కాదు.',
  },
  'onboarding.slide2Title': { en: 'Know exactly what you need', te: 'మీకు సరిగ్గా ఏమి కావాలో తెలుసుకోండి' },
  'onboarding.slide2Body': {
    en: 'Tell us your headcount and we calculate the exact samagri quantities for your pooja, automatically.',
    te: 'మీ పాల్గొనేవారి సంఖ్యను చెప్పండి, మేము మీ పూజకు కావలసిన సామగ్రి పరిమాణాలను స్వయంచాలకంగా లెక్కిస్తాము.',
  },
  'onboarding.slide3Title': { en: 'Ask anything, hands-free', te: 'చేతులు లేకుండా, ఏదైనా అడగండి' },
  'onboarding.slide3Body': {
    en: 'Mid-ritual doubts happen. Ask your AI assistant by voice without ever putting down the diya.',
    te: 'పూజ మధ్యలో సందేహాలు రావడం సహజం. దీపాన్ని కిందపెట్టకుండానే మీ AI సహాయకుడిని వాయిస్ ద్వారా అడగండి.',
  },
  'onboarding.getStarted': { en: 'Get Started', te: 'ప్రారంభించండి' },
  'onboarding.next': { en: 'Next', te: 'తరువాత' },

  'language.title': { en: 'Choose your language', te: 'మీ భాషను ఎంచుకోండి' },
  'language.subtitle': { en: 'Select the language for your spiritual journey', te: 'మీ ఆధ్యాత్మిక ప్రయాణం కోసం భాషను ఎంచుకోండి' },

  'tradition.title': { en: 'Select your tradition', te: 'మీ సంప్రదాయాన్ని ఎంచుకోండి' },
  'tradition.subtitle': {
    en: 'Customize your ritual experience based on your regional practices. You can always change this later in settings.',
    te: 'మీ ప్రాంతీయ ఆచారాల ఆధారంగా మీ పూజా అనుభవాన్ని అనుకూలీకరించండి. దీన్ని మీరు ఎప్పుడైనా సెట్టింగ్‌లలో మార్చుకోవచ్చు.',
  },

  'auth.namaste': { en: 'Namaste.', te: 'నమస్తే.' },
  'auth.welcomeBack': { en: 'Welcome back to your sanctuary.', te: 'మీ ఆలయానికి తిరిగి స్వాగతం.' },
  'auth.email': { en: 'Email', te: 'ఇమెయిల్' },
  'auth.enterEmail': { en: 'Enter your email', te: 'మీ ఇమెయిల్ నమోదు చేయండి' },
  'auth.password': { en: 'Password', te: 'పాస్‌వర్డ్' },
  'auth.signIn': { en: 'Sign In', te: 'సైన్ ఇన్ చేయండి' },
  'auth.createAccount': { en: 'Create Account', te: 'ఖాతా సృష్టించండి' },
  'auth.newHere': { en: 'New here? ', te: 'కొత్తగా వచ్చారా? ' },
  'auth.alreadyHaveAccount': { en: 'Already have an account? ', te: 'ఇప్పటికే ఖాతా ఉందా? ' },
  'auth.or': { en: 'OR', te: 'లేదా' },
  'auth.continueWithGoogle': { en: 'Continue with Google', te: 'గూగుల్‌తో కొనసాగించండి' },
  'auth.continueAsGuest': { en: 'Continue as Guest', te: 'అతిథిగా కొనసాగించండి' },
  'auth.backendNotConnectedTitle': { en: 'Backend not connected yet', te: 'బ్యాకెండ్ ఇంకా కనెక్ట్ కాలేదు' },
  'auth.backendNotConnectedBody': {
    en: 'The database has not been set up yet. Run schema.sql in Supabase and add the project URL/key to mobile/.env — see mobile/README.md. Continuing as guest for now.',
    te: 'డేటాబేస్ ఇంకా సెటప్ చేయలేదు. Supabaseలో schema.sql రన్ చేసి, ప్రాజెక్ట్ URL/కీని mobile/.env కి జోడించండి — mobile/README.md చూడండి. ప్రస్తుతానికి అతిథిగా కొనసాగిస్తున్నాము.',
  },
  'auth.missingInfoTitle': { en: 'Missing info', te: 'సమాచారం లేదు' },
  'auth.missingInfoBody': { en: 'Please enter both an email and a password.', te: 'దయచేసి ఇమెయిల్ మరియు పాస్‌వర్డ్ రెండింటినీ నమోదు చేయండి.' },
  'auth.couldNotSignIn': { en: 'Could not sign in', te: 'సైన్ ఇన్ చేయలేకపోయాము' },
  'auth.couldNotSignUp': { en: 'Could not sign up', te: 'సైన్ అప్ చేయలేకపోయాము' },
  'auth.checkInboxTitle': { en: 'Check your inbox', te: 'మీ ఇన్‌బాక్స్ చూడండి' },
  'auth.checkInboxBody': { en: 'Confirm your email if required, then sign in.', te: 'అవసరమైతే మీ ఇమెయిల్‌ను నిర్ధారించి, తర్వాత సైన్ ఇన్ చేయండి.' },
  'auth.googleComingSoonBody': {
    en: 'Google sign-in will be available in a future update.',
    te: 'గూగుల్ సైన్-ఇన్ భవిష్యత్ అప్‌డేట్‌లో అందుబాటులో ఉంటుంది.',
  },

  'home.namaste': { en: 'Namaste, {name}', te: 'నమస్తే, {name}' },
  'home.guestLabel': { en: 'Guest', te: 'అతిథి' },
  'home.friendLabel': { en: 'Friend', te: 'మిత్రమా' },
  'home.subtitle': {
    en: 'Find peace in your daily practice. Here is your ritual guidance for today.',
    te: 'మీ నిత్య సాధనలో శాంతిని పొందండి. ఇదిగో నేటి మీ పూజా మార్గదర్శకం.',
  },
  'home.todaysPanchangam': { en: 'TODAY’S PANCHANGAM', te: 'నేటి పంచాంగం' },
  'home.auspiciousMuhurat': { en: 'Auspicious Muhurat', te: 'శుభ ముహూర్తం' },
  'home.durmuhurat': { en: 'Durmuhurtam', te: 'దుర్ముహూర్తం' },
  'home.durmuhuratHint': { en: 'Avoid starting new tasks', te: 'కొత్త పనులు ప్రారంభించవద్దు' },
  'home.startDailyPuja': { en: 'Start Daily Puja', te: 'నిత్య పూజ ప్రారంభించండి' },
  'home.continueMeditation': { en: 'Continue Meditation', te: 'ధ్యానం కొనసాగించండి' },
  'home.featuredPoojas': { en: 'Featured Poojas', te: 'ప్రత్యేక పూజలు' },
  'home.festivalCalendar': { en: 'Festival Calendar', te: 'పండుగల క్యాలెండర్' },
  'home.festivalCalendarSubtitle': { en: 'Upcoming festivals & dates', te: 'రాబోయే పండుగలు & తేదీలు' },
  'home.dailyPujaComingSoonBody': {
    en: 'Daily Puja guidance is on the roadmap for a future update.',
    te: 'నిత్య పూజ మార్గదర్శకం భవిష్యత్ అప్‌డేట్‌లో రానుంది.',
  },
  'home.meditationComingSoonBody': {
    en: 'Guided meditation is on the roadmap for a future update.',
    te: 'మార్గదర్శిత ధ్యానం భవిష్యత్ అప్‌డేట్‌లో రానుంది.',
  },

  'library.title': { en: 'Pooja Library', te: 'పూజా గ్రంథాలయం' },
  'library.subtitle': { en: 'Browse guided rituals for your tradition.', te: 'మీ సంప్రదాయానికి సంబంధించిన మార్గదర్శిత పూజలను బ్రౌజ్ చేయండి.' },
  'library.comingSoon': { en: 'COMING SOON', te: 'త్వరలో వస్తుంది' },
  'library.searchPlaceholder': { en: 'Search poojas…', te: 'పూజల కోసం శోధించండి…' },
  'library.count': { en: '{count} poojas', te: '{count} పూజలు' },
  'library.noResults': { en: 'No poojas match your search.', te: 'మీ శోధనకు సరిపోలే పూజలు లేవు.' },
  'library.addPooja': { en: 'Add Your Pooja', te: 'మీ పూజను జోడించండి' },
  'library.uploadPrompt': {
    en: 'Please upload your pooja vidhi as a PDF and our AI will read it and set it up for you.',
    te: 'దయచేసి మీ పూజా విధిని PDF గా అప్‌లోడ్ చేయండి — మా AI దానిని చదివి మీ కోసం సిద్ధం చేస్తుంది.',
  },
  'library.choosePdf': { en: 'Choose PDF file', te: 'PDF ఫైల్‌ను ఎంచుకోండి' },
  'library.upload': { en: 'Upload', te: 'అప్‌లోడ్ చేయండి' },
  'library.uploadedTitle': { en: 'Uploaded', te: 'అప్‌లోడ్ అయింది' },
  'library.uploadedBody': {
    en: 'We’ll review your pooja and notify you once it’s ready.',
    te: 'మేము మీ పూజను సమీక్షించి, సిద్ధమైన తర్వాత మీకు తెలియజేస్తాము.',
  },

  'poojaDetail.whatYouNeed': { en: 'What you’ll need', te: 'మీకు కావలసినవి' },
  'poojaDetail.more': { en: 'More', te: 'మరిన్ని' },
  'poojaDetail.close': { en: 'Close', te: 'మూసివేయండి' },
  'poojaDetail.notFound': { en: 'Pooja not found.', te: 'పూజ కనుగొనబడలేదు.' },
  'poojaDetail.planThisPooja': { en: 'Plan This Pooja', te: 'ఈ పూజను ప్లాన్ చేయండి' },
  'poojaDetail.startNow': { en: 'Start Now', te: 'ఇప్పుడే ప్రారంభించండి' },
  'poojaDetail.seeAuspiciousTiming': { en: 'See auspicious timing', te: 'శుభ సమయాన్ని చూడండి' },
  'poojaDetail.comingSoonBody': {
    en: '{name} guidance is on the roadmap for a future update.',
    te: '{name} మార్గదర్శకం భవిష్యత్ అప్‌డేట్‌లో రానుంది.',
  },
  'poojaDetail.fullContentComingSoon': {
    en: 'Full step-by-step content for {name} is coming in a future update. Try Ganesh Pooja for the full experience.',
    te: '{name} కోసం పూర్తి దశల వారీ కంటెంట్ భవిష్యత్ అప్‌డేట్‌లో వస్తుంది. పూర్తి అనుభవం కోసం గణేశ పూజను ప్రయత్నించండి.',
  },

  'headcount.title': { en: 'How many people?', te: 'ఎంతమంది ఉన్నారు?' },
  'headcount.subtitle': {
    en: 'Select the number of participants to accurately calculate the required samagri (items) for {name}.',
    te: '{name} కోసం అవసరమైన సామగ్రిని ఖచ్చితంగా లెక్కించడానికి పాల్గొనేవారి సంఖ్యను ఎంచుకోండి.',
  },
  'headcount.participants': { en: 'PARTICIPANTS', te: 'పాల్గొనేవారు' },
  'headcount.includeChildren': { en: 'Include children', te: 'పిల్లలను చేర్చండి' },
  'headcount.includeChildrenSubtitle': { en: 'Adjusts prasad quantities', te: 'ప్రసాద పరిమాణాలను సర్దుబాటు చేస్తుంది' },
  'headcount.extendedFamily': { en: 'Extended family', te: 'బంధువులు' },
  'headcount.extendedFamilySubtitle': { en: 'Adds seating & extra items', te: 'కూర్చునే ఏర్పాటు & అదనపు వస్తువులను జోడిస్తుంది' },
  'headcount.calculateItems': { en: 'Calculate Items', te: 'వస్తువులను లెక్కించండి' },

  'checklist.titlePrefix': { en: 'Checklist: {name}', te: 'చెక్‌లిస్ట్: {name}' },
  'checklist.calculating': { en: 'Calculating quantities…', te: 'పరిమాణాలను లెక్కిస్తోంది…' },
  'checklist.progress': {
    en: 'For {headcount} participants. {checked} of {total} gathered.',
    te: '{headcount} మంది పాల్గొనేవారి కోసం. {total}లో {checked} సేకరించారు.',
  },
  'checklist.startPooja': { en: 'Start Pooja', te: 'పూజ ప్రారంభించండి' },

  'muhurat.title': { en: 'Best time for this pooja', te: 'ఈ పూజకు ఉత్తమ సమయం' },
  'muhurat.subtitle': {
    en: 'Sample muhurat based on typical planetary alignments — full location-aware calculation lands in a later phase.',
    te: 'సాధారణ గ్రహ స్థితుల ఆధారంగా నమూనా ముహూర్తం — పూర్తి స్థాన-ఆధారిత గణన తర్వాతి దశలో వస్తుంది.',
  },
  'muhurat.recommended': { en: 'RECOMMENDED', te: 'సిఫార్సు చేయబడింది' },
  'muhurat.infoLabel': { en: 'Brahma Muhurta & Shukla Paksha', te: 'బ్రహ్మ ముహూర్తం & శుక్ల పక్షం' },
  'muhurat.infoBody': {
    en: 'This time aligns with the early morning purity of Brahma Muhurta during the auspicious Shukla Paksha (waxing moon phase), ideal for new beginnings.',
    te: 'ఈ సమయం శుభ శుక్ల పక్షంలో (వృద్ధి చెందుతున్న చంద్ర దశ) బ్రహ్మ ముహూర్త ప్రాతఃకాల పవిత్రతతో సరిపోలుతుంది, కొత్త ప్రారంభాలకు అనువైనది.',
  },
  'muhurat.continueToPreparation': { en: 'Continue to Preparation', te: 'సన్నాహానికి కొనసాగండి' },

  'walkthrough.stepOf': { en: 'Step {current} of {total}', te: 'దశ {current} / {total}' },
  'walkthrough.previous': { en: 'Previous', te: 'వెనుకకు' },
  'walkthrough.nextStep': { en: 'Next Step', te: 'తరువాతి దశ' },
  'walkthrough.finish': { en: 'Finish', te: 'ముగించు' },

  'chat.yourPooja': { en: 'your pooja', te: 'మీ పూజ' },
  'chat.seed': {
    en: 'Namaste! Ask me anything about {name} — item substitutes, timing, or what a step means.',
    te: 'నమస్తే! {name} గురించి ఏదైనా అడగండి — వస్తువుల ప్రత్యామ్నాయాలు, సమయం, లేదా ఒక దశ అర్థం ఏమిటి.',
  },
  'chat.currentStep': { en: 'CURRENT STEP: {step}', te: 'ప్రస్తుత దశ: {step}' },
  'chat.placeholder': { en: 'Type your question…', te: 'మీ ప్రశ్నను టైప్ చేయండి…' },
  'chat.voiceComingSoonBody': {
    en: 'Voice input will be available in a future update.',
    te: 'వాయిస్ ఇన్‌పుట్ భవిష్యత్ అప్‌డేట్‌లో అందుబాటులో ఉంటుంది.',
  },
  'chat.suggestion1': { en: 'Is it okay to start late?', te: 'ఆలస్యంగా ప్రారంభించవచ్చా?' },
  'chat.suggestion2': { en: 'Alternative for Kalash?', te: 'కలశానికి ప్రత్యామ్నాయం?' },
  'chat.cannedMangoLeaves': {
    en: 'You can use betel leaves as a common substitute, or simply offer an extra flower with devotion.',
    te: 'సాధారణ ప్రత్యామ్నాయంగా తమలపాకులను ఉపయోగించవచ్చు, లేదా భక్తితో ఒక అదనపు పువ్వును సమర్పించవచ్చు.',
  },
  'chat.cannedLate': {
    en: 'It is generally fine to start a little later than the suggested muhurat — devotion and sincerity matter most. For strict timing needs, consult a priest.',
    te: 'సూచించిన ముహూర్తం కంటే కొంచెం ఆలస్యంగా ప్రారంభించడం సాధారణంగా ఫర్వాలేదు — భక్తి మరియు నిజాయితీయే ముఖ్యం. ఖచ్చితమైన సమయం అవసరమైతే, పురోహితుడిని సంప్రదించండి.',
  },
  'chat.cannedKalash': {
    en: 'A steel or brass pot filled with water works well if you do not have a traditional kalash.',
    te: 'సాంప్రదాయ కలశం లేకపోతే, నీటితో నింపిన స్టీల్ లేదా ఇత్తడి పాత్ర బాగా పనిచేస్తుంది.',
  },
  'chat.cannedQuantity': {
    en: 'Exact quantities for your headcount are on the Item Checklist screen — they update automatically as you change your participant count.',
    te: 'మీ పాల్గొనేవారి సంఖ్యకు ఖచ్చితమైన పరిమాణాలు ఐటెమ్ చెక్‌లిస్ట్ స్క్రీన్‌లో ఉన్నాయి — మీరు పాల్గొనేవారి సంఖ్యను మార్చినప్పుడు అవి స్వయంచాలకంగా అప్‌డేట్ అవుతాయి.',
  },
  'chat.fallbackReply': {
    en: 'I want to make sure that answer is grounded and accurate. For questions outside what I can verify, please consult a priest — full AI guidance is coming in a future update.',
    te: 'ఆ సమాధానం సరైనది మరియు ఖచ్చితమైనదని నిర్ధారించుకోవాలనుకుంటున్నాను. నేను ధృవీకరించలేని ప్రశ్నల కోసం, దయచేసి పురోహితుడిని సంప్రదించండి — పూర్తి AI మార్గదర్శకం భవిష్యత్ అప్‌డేట్‌లో వస్తుంది.',
  },

  'profile.title': { en: 'Settings', te: 'సెట్టింగ్‌లు' },
  'profile.browsingAsGuest': { en: 'Browsing as Guest', te: 'అతిథిగా బ్రౌజ్ చేస్తున్నారు' },
  'profile.signInToSave': {
    en: 'Sign in to save your plans and checklists across devices.',
    te: 'మీ ప్లాన్‌లు మరియు చెక్‌లిస్ట్‌లను అన్ని పరికరాల్లో సేవ్ చేయడానికి సైన్ ఇన్ చేయండి.',
  },
  'profile.language': { en: 'Language', te: 'భాష' },
  'profile.regionTradition': { en: 'Region/Tradition', te: 'ప్రాంతం/సంప్రదాయం' },
  'profile.notifications': { en: 'Notifications', te: 'నోటిఫికేషన్‌లు' },
  'profile.notificationsComingSoonBody': {
    en: 'Push notification preferences are coming in a future update.',
    te: 'పుష్ నోటిఫికేషన్ ప్రాధాన్యతలు భవిష్యత్ అప్‌డేట్‌లో వస్తాయి.',
  },
  'profile.helpSupport': { en: 'Help & Support', te: 'సహాయం & మద్దతు' },
  'profile.darkMode': { en: 'Dark Mode', te: 'డార్క్ మోడ్' },
  'profile.signIn': { en: 'SIGN IN', te: 'సైన్ ఇన్' },
  'profile.signOut': { en: 'SIGN OUT', te: 'సైన్ అవుట్' },
  'profile.astrologyProfile': { en: 'Astrology Profile', te: 'జ్యోతిష్య ప్రొఫైల్' },

  'astrology.title': { en: 'Your Astrology Profile', te: 'మీ జ్యోతిష్య ప్రొఫైల్' },
  'astrology.subtitle': {
    en: 'Add your birth details to personalize your daily guidance.',
    te: 'మీ నిత్య మార్గదర్శకాన్ని వ్యక్తిగతం చేయడానికి మీ జనన వివరాలను జోడించండి.',
  },
  'astrology.rashi': { en: 'Rashi (Moon Sign)', te: 'రాశి (చంద్ర రాశి)' },
  'astrology.star': { en: 'Star (Nakshatra)', te: 'నక్షత్రం' },
  'astrology.dob': { en: 'Date of Birth', te: 'పుట్టిన తేదీ' },
  'astrology.dobPlaceholder': { en: 'YYYY-MM-DD', te: 'YYYY-MM-DD' },
  'astrology.placeOfBirth': { en: 'Place of Birth', te: 'పుట్టిన స్థలం' },
  'astrology.placePlaceholder': { en: 'City, State/Country', te: 'నగరం, రాష్ట్రం/దేశం' },
  'astrology.disclaimer': {
    en: 'Sample guidance for this prototype — not a substitute for personalized astrological consultation.',
    te: 'ఈ ప్రోటోటైప్ కోసం నమూనా మార్గదర్శకం — వ్యక్తిగత జ్యోతిష్య సలహాకు ప్రత్యామ్నాయం కాదు.',
  },
  'astrology.saved': { en: 'Saved', te: 'సేవ్ చేయబడింది' },

  'home.astrologyTitle': { en: 'Your Rashi Today', te: 'నేటి మీ రాశి ఫలం' },
  'home.astrologyPrompt': {
    en: 'Add your birth details to see personalized astrology',
    te: 'వ్యక్తిగత జ్యోతిష్యం చూడటానికి మీ జనన వివరాలను జోడించండి',
  },
  'home.astrologyCta': { en: 'Add Details', te: 'వివరాలు జోడించండి' },

  'help.title': { en: 'Help & Support', te: 'సహాయం & మద్దతు' },
  'help.subtitle': {
    en: 'Find answers to common questions about your spiritual journey or reach out for guidance.',
    te: 'మీ ఆధ్యాత్మిక ప్రయాణానికి సంబంధించిన సాధారణ ప్రశ్నలకు సమాధానాలు కనుగొనండి లేదా మార్గదర్శకత్వం కోసం సంప్రదించండి.',
  },
  'help.searchPlaceholder': { en: 'Search for answers…', te: 'సమాధానాల కోసం శోధించండి…' },
  'help.faqTitle': { en: 'Frequently Asked Questions', te: 'తరచుగా అడిగే ప్రశ్నలు' },
  'help.faq1Q': { en: 'How do I start a new pooja ritual?', te: 'నేను కొత్త పూజా ఆచారాన్ని ఎలా ప్రారంభించాలి?' },
  'help.faq1A': {
    en: 'Navigate to the Library tab and browse through the available poojas. Once you select a ritual, review the required materials before tapping "Start Now" or "Plan This Pooja" to enter the guided experience.',
    te: 'గ్రంథాలయం ట్యాబ్‌కు వెళ్లి అందుబాటులో ఉన్న పూజలను బ్రౌజ్ చేయండి. మీరు ఒక ఆచారాన్ని ఎంచుకున్న తర్వాత, మార్గదర్శిత అనుభవంలోకి ప్రవేశించడానికి "ఇప్పుడే ప్రారంభించండి" లేదా "ఈ పూజను ప్లాన్ చేయండి" నొక్కే ముందు అవసరమైన సామగ్రిని సమీక్షించండి.',
  },
  'help.faq2Q': {
    en: 'What do I do if I miss a step during the guided ritual?',
    te: 'మార్గదర్శిత ఆచార సమయంలో నేను ఒక దశను మిస్ అయితే ఏమి చేయాలి?',
  },
  'help.faq2A': {
    en: 'During any guided ritual, use the "Previous" button at the bottom of the screen to go back as many steps as needed without losing your overall progress.',
    te: 'ఏదైనా మార్గదర్శిత ఆచార సమయంలో, మీ మొత్తం పురోగతిని కోల్పోకుండా అవసరమైనన్ని దశలు వెనక్కి వెళ్లడానికి స్క్రీన్ దిగువన ఉన్న "వెనుకకు" బటన్‌ను ఉపయోగించండి.',
  },
  'help.faq3Q': { en: 'Can I use the app offline?', te: 'నేను యాప్‌ను ఆఫ్‌లైన్‌లో ఉపయోగించవచ్చా?' },
  'help.faq3A': {
    en: 'Pooja content and your saved checklist work offline once loaded. The AI assistant and account sync require an active internet connection.',
    te: 'పూజా కంటెంట్ మరియు మీ సేవ్ చేసిన చెక్‌లిస్ట్ లోడ్ అయిన తర్వాత ఆఫ్‌లైన్‌లో పనిచేస్తాయి. AI సహాయకుడు మరియు ఖాతా సమకాలీకరణకు యాక్టివ్ ఇంటర్నెట్ కనెక్షన్ అవసరం.',
  },
  'help.needMoreGuidance': { en: 'Need more guidance?', te: 'మరింత మార్గదర్శకత్వం కావాలా?' },
  'help.supportBody': {
    en: 'Our dedicated spiritual guides and technical support team are here to assist you.',
    te: 'మా అంకితమైన ఆధ్యాత్మిక మార్గదర్శకులు మరియు సాంకేతిక మద్దతు బృందం మీకు సహాయం చేయడానికి సిద్ధంగా ఉన్నారు.',
  },
  'help.contactSupport': { en: 'Contact Support', te: 'మద్దతును సంప్రదించండి' },

  'festivals.title': { en: 'Festival Calendar', te: 'పండుగల క్యాలెండర్' },
  'festivals.subtitle': { en: 'Upcoming festivals based on the panchangam.', te: 'పంచాంగం ఆధారంగా రాబోయే పండుగలు.' },
  'festivals.disclaimer': {
    en: 'Sample dates for this prototype — full location-aware panchangam calculations land in a later phase.',
    te: 'ఈ ప్రోటోటైప్ కోసం నమూనా తేదీలు — పూర్తి స్థాన-ఆధారిత పంచాంగ గణన తర్వాతి దశలో వస్తుంది.',
  },
  'festivals.starts': { en: 'Starts', te: 'ప్రారంభం' },
  'festivals.ends': { en: 'Ends', te: 'ముగింపు' },
  'festivals.viewDetails': { en: 'View Details', te: 'వివరాలు చూడండి' },
  'festivals.notFound': { en: 'Festival not found.', te: 'పండుగ కనుగొనబడలేదు.' },

  'panchangam.title': { en: 'Today’s Panchangam', te: 'నేటి పంచాంగం' },
  'panchangam.auspiciousMuhurat': { en: 'AUSPICIOUS MUHURAT', te: 'శుభ ముహూర్తం' },
  'panchangam.durmuhurat': { en: 'Durmuhurtam — avoid new tasks', te: 'దుర్ముహూర్తం — కొత్త పనులు ప్రారంభించవద్దు' },
  'panchangam.disclaimer': {
    en: 'Sample data for this prototype — full panchangam with location-aware calculations lands in a later phase.',
    te: 'ఈ ప్రోటోటైప్ కోసం నమూనా డేటా — పూర్తి పంచాంగం స్థాన-ఆధారిత గణనతో తర్వాతి దశలో వస్తుంది.',
  },
  'panchangam.tithi': { en: 'Tithi', te: 'తిథి' },
  'panchangam.nakshatra': { en: 'Nakshatra', te: 'నక్షత్రం' },
  'panchangam.sunrise': { en: 'Sunrise', te: 'సూర్యోదయం' },
  'panchangam.sunset': { en: 'Sunset', te: 'సూర్యాస్తమయం' },
  'panchangam.rahuKalam': { en: 'Rahu Kalam — inauspicious', te: 'రాహు కాలం — అశుభం' },
  'panchangam.yamagandam': { en: 'Yamagandam — inauspicious', te: 'యమగండం — అశుభం' },
  'panchangam.gulikaKalam': { en: 'Gulika Kalam — inauspicious', te: 'గుళిక కాలం — అశుభం' },
  'panchangam.varjyam': { en: 'Varjyam — inauspicious', te: 'వర్జ్యం — అశుభం' },
  'panchangam.sun': { en: 'Su', te: 'ఆది' },
  'panchangam.mon': { en: 'Mo', te: 'సోమ' },
  'panchangam.tue': { en: 'Tu', te: 'మం' },
  'panchangam.wed': { en: 'We', te: 'బుధ' },
  'panchangam.thu': { en: 'Th', te: 'గురు' },
  'panchangam.fri': { en: 'Fr', te: 'శుక్ర' },
  'panchangam.sat': { en: 'Sa', te: 'శని' },

  'tabs.home': { en: 'Home', te: 'హోమ్' },
  'tabs.library': { en: 'Library', te: 'గ్రంథాలయం' },
  'tabs.panchangam': { en: 'Panchangam', te: 'పంచాంగం' },
  'tabs.festivals': { en: 'Festivals', te: 'పండుగలు' },
} as const satisfies Record<string, Localized>;

export type StringKey = keyof typeof STRINGS;

export function t(key: StringKey, languageCode: string, params?: Record<string, string | number>): string {
  let result = localize(STRINGS[key], languageCode);
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      result = result.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
    }
  }
  return result;
}

export function useTranslation() {
  const { languageCode } = usePrefs();
  return { t: (key: StringKey, params?: Record<string, string | number>) => t(key, languageCode, params), languageCode };
}

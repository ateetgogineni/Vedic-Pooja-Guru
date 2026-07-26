import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// A handful of glyphs used in the designs only exist in the "Community"
// icon set, not the base MaterialIcons font — route those specifically.
// NOTE: 'temple-hindu', 'diversity-3', 'wb-twilight', and 'filter-vintage'
// were previously listed here too, but they don't exist in the bundled
// MaterialCommunityIcons glyph map (they render as a "?" fallback glyph) —
// they DO exist in the base MaterialIcons font, so they're left to fall
// through to the default case below. Verified against
// node_modules/react-native-vector-icons/glyphmaps/{MaterialIcons,MaterialCommunityIcons}.json.
const COMMUNITY_ICON_NAMES = new Set(['human-child']);

type Props = {
  /** kebab-case icon name, e.g. "arrow-back" */
  name: string;
  size?: number;
  color: string;
};

export function Icon({ name, size = 22, color }: Props) {
  if (COMMUNITY_ICON_NAMES.has(name)) {
    return <MaterialCommunityIcons name={name} size={size} color={color} />;
  }
  return <MaterialIcons name={name} size={size} color={color} />;
}

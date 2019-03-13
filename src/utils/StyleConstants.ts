enum COLOR {
  CYAN_DARK = '#4DD0E1',
  CYAN_LIGHT = '#00838F',
  TEAL_DARK = '#26A69A',
  TEAL_LIGHT = '#00695C',
  PURPLE_DARK = '#7E57C2',
  PURPLE_LIGHT = '#4527A0',
  RED_DARK = '#E57373',
  RED_LIGHT = '#B71C1C',
  ORANGE_DARK = '#FFB74D',
  ORANGE_LIGHT = '#EF6C00',
  BLUE_DARK = '#42A5F5',
  BLUE_LIGHT = '#0D47A1',
  YELLOW_DARK = '#FFEE58',
  YELLOW_LIGHT = '#F9A825'
}

export default class StyleConstants {

  public static readonly PROJECT_DARK = COLOR.BLUE_DARK;
  public static readonly PROJECT_LIGHT = COLOR.BLUE_LIGHT;
  public static readonly CONTEXT_DARK = COLOR.ORANGE_DARK;
  public static readonly CONTEXT_LIGHT = COLOR.ORANGE_LIGHT;
  public static readonly DATE_DARK = COLOR.YELLOW_DARK;
  public static readonly DATE_LIGHT = COLOR.YELLOW_LIGHT;
  public static readonly PRIORITY_DARK = COLOR.PURPLE_DARK;
  public static readonly PRIORITY_LIGHT = COLOR.PURPLE_LIGHT;
  public static readonly OVERDUE_DARK = COLOR.RED_DARK;
  public static readonly OVERDUE_LIGHT = COLOR.RED_LIGHT;
  public static readonly THRESHOLD_DARK = COLOR.TEAL_DARK;
  public static readonly THRESHOLD_LIGHT = COLOR.TEAL_LIGHT;

  public static readonly COMPLETED_CSS = 'font-style: italic; text-decoration: line-through; opacity: 0.5;';
}
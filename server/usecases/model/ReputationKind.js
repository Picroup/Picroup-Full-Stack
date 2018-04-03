
export default class ReputationKind {
  static saveMedium = 'saveMedium';
  static starMedium = 'starMedium';
  static followUser = 'followUser';

  static reputationValue = (kind) => {
    switch (kind) {
      case ReputationKind.saveMedium: return 5;
      case ReputationKind.starMedium: return 10;
      case ReputationKind.followUser: return 50;
      default: throw new Error('Unknown reputation kind')
    }
  };
}

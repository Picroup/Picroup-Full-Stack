
export const SAVE_MEDIUM = 'SAVE_MEDIUM';
export const STAR_MEDIUM = 'STAR_MEDIUM';
export const FOLLOW_USER = 'FOLLOW_USER';

export const reputationValue = (kind) => {
  switch (kind) {
    case SAVE_MEDIUM: return 5;
    case STAR_MEDIUM: return 10;
    case FOLLOW_USER: return 50;
    default: throw new Error('Unknown reputation kind')
  }
};
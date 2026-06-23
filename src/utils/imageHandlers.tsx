import { Dispatch, SetStateAction } from 'react';

export const handleImageError = (
  event: React.SyntheticEvent<HTMLImageElement, Event>,
  id: string,
  setErrorImages: Dispatch<SetStateAction<Record<string, boolean>>>
) => {
  const target = event.currentTarget as HTMLImageElement;
  if (target.src.endsWith('.jpg')) {
    target.src = target.src.replace('.jpg', '.png');
  } else {
    setErrorImages((prev) => ({ ...prev, [id]: true }));
  }
};

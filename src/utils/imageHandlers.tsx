import { Dispatch, SetStateAction } from 'react';

export const handleImageError = (
  event: React.SyntheticEvent<HTMLImageElement, Event>,
  id: string,
  setErrorImages: Dispatch<SetStateAction<Record<string, boolean>>>
) => {
  const target = event.currentTarget as HTMLImageElement;
  setErrorImages((prevErrorImages) => ({
    ...prevErrorImages,
    [id]: true,
  }));
};
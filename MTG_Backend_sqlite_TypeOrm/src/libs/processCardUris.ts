import { CardImageUris } from "../entities/cardImageUris.entity";
import { Card } from "../entities/cards.entity";

/**
 * Processes the image URIs of a card object.
 * Returns a CardImageUris object with default values if no image URIs are found.
 *
 * @param {Card} cardObj - The card object containing image URIs.
 * @returns {CardImageUris} A CardImageUris object with image URIs or default values.
 */
export const processCardImageUris = (cardObj: Card): CardImageUris => {
  const imageUris = new CardImageUris();
  if (!cardObj.image_uris) {
    imageUris.small = "no_image";
    imageUris.normal = "no_image";
    imageUris.large = "no_image";
    imageUris.png = "no_image";
    imageUris.art_crop = "no_image";
    imageUris.border_crop = "no_image";
    return imageUris;
  }
  if (cardObj.image_uris && cardObj.image_uris.small) {
    imageUris.small = cardObj.image_uris.small;
  } else {
    imageUris.small = "no_image";
  }
  if (cardObj.image_uris && cardObj.image_uris.normal) {
    imageUris.normal = cardObj.image_uris.normal;
  } else {
    imageUris.normal = "no_image";
  }
  if (cardObj.image_uris && cardObj.image_uris.large) {
    imageUris.large = cardObj.image_uris.large;
  } else {
    imageUris.large = "no_image";
  }
  if (cardObj.image_uris && cardObj.image_uris.png) {
    imageUris.png = cardObj.image_uris.png;
  } else {
    imageUris.png = "no_image";
  }
  if (cardObj.image_uris && cardObj.image_uris.art_crop) {
    imageUris.art_crop = cardObj.image_uris.art_crop;
  } else {
    imageUris.art_crop = "no_image";
  }
  if (cardObj.image_uris && cardObj.image_uris.border_crop) {
    imageUris.border_crop = cardObj.image_uris.border_crop;
  } else {
    imageUris.border_crop = "no_image";
  }
  return imageUris;
};

import { CardInterface } from "@/types-d";
import styles from "./SingleCard.module.css";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

interface SingleCardProps {
  card: CardInterface;
  addCard: (card: CardInterface) => void;
}

const SingleCard = ({ card, addCard }: SingleCardProps) => {
  return (
    <article key={card.card_id + card.name}>
      <Card className="w-[300px] bg-accent">
        <CardHeader>
          <CardTitle className={styles.truncate}>{card.name}</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <img
            className="hover:scale-110 transition-all duration-200"
            src={
              card.image_uris.normal === "no_image"
                ? "src/assets/cardAssets/1.webp"
                : card.image_uris.normal
            }
            alt={card.name}
          />
        </CardContent>
        <CardFooter className="flex justify-center ">
          <Button className="w-32" onClick={() => addCard(card)}>
            Add to your deck
          </Button>
        </CardFooter>
      </Card>
    </article>
  );
};

export default SingleCard;

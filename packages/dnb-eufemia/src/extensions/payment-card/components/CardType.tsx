import React from "react";
import classnames from "classnames";
import { createSkeletonClass } from "../../../components/skeleton/SkeletonHelper";
import P from "../../../elements/P";

interface CardTypeTextProps {
  isCredit: boolean;
  translations: {
    text_type_credit: string;
    text_type_debit: string;
  };
  skeleton: boolean;
}

const CardTypeText: React.FC<CardTypeTextProps> = ({ isCredit, translations, skeleton }) => {
  return (
      <span className={classnames(
          'dnb-payment-card__card__wrapper', createSkeletonClass('font', skeleton))}>
    <P className={'dnb-payment-card__card__type-text'}>
      {isCredit ? translations.text_type_credit : translations.text_type_debit}
    </P>
  </span>
  );
};

export default CardTypeText;
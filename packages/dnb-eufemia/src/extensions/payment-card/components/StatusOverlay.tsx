import React from "react";
import classnames from "classnames";
import { createSkeletonClass } from "../../../components/skeleton/SkeletonHelper";
import { StatusIcon } from "../icons";
import P from "../../../elements/P";

interface Translations {
  text_status_blocked: string;
  text_status_expired: string;
  text_status_not_active: string;
  text_status_new_order: string;
  text_status_order_in_process: string;
  text_status_replaced: string;
  text_status_renewed: string;
  text_status_new: string;
  text_status_unknown: string;
}

interface StatusOverlayProps {
  cardStatus: string;
  cardDesign: string;
  translations: Translations;
}

const StatusOverlay: React.FC<StatusOverlayProps> = ({ cardStatus, translations, cardDesign }) => {
  const cardStatusMap: Record<string, string> = {
    not_active: translations.text_status_not_active,
    new_order: translations.text_status_new_order,
    order_in_process: translations.text_status_order_in_process,
    renewed: translations.text_status_renewed,
    replaced: translations.text_status_replaced,
    blocked: translations.text_status_blocked,
    expired: translations.text_status_expired,
    new: translations.text_status_new,
    unknown: translations.text_status_unknown,
  };
  
  const cardStatusOverlayThemeMap: Record<string, string> = {
    'card--design-default': 'light',
    'card--design-business-no-visa': 'light',
    'card--design-business-with-visa': 'light',
    'card--design-ung': 'light',
    'card--design-youth': 'light',
    'card--design-my-first': 'light',
    'card--design-sbanken-visa': 'light',
    'card--design-pluss': 'dark',
    'card--design-gold': 'dark',
    'card--design-saga': 'dark',
    'card--design-saga-platinum': 'dark',
    'card--design-private': 'dark',
    'card--design-black': 'dark',
    'card--design-sbanken-mastercard': 'dark',
  };

  return cardStatusMap[cardStatus] ? (
      <div className='dnb-payment-card__overlay'>
        <div className={classnames(
            'dnb-payment-card__overlay__content',
            `dnb-payment-card__overlay__content--${cardStatusOverlayThemeMap[cardDesign]}`)}>
          <StatusIcon status={cardStatus} />
          <P>{cardStatusMap[cardStatus]}</P>
        </div>
      </div>
  ) : null;
};

export const isCardBlocked = (cardStatus: string) : boolean => {
  const cardStatusMap: Record<string, boolean> = {
    not_active: true,
    new_order: false,
    order_in_process: false,
    renewed: false,
    replaced: false,
    blocked: true,
    expired: true,
    new: false,
    unknown: false,
  };

  return cardStatusMap[cardStatus];
};

export default StatusOverlay;
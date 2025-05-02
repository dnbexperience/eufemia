import * as React from 'react';
export interface CardFigureProps extends React.HTMLProps<HTMLElement> {
  id?: string;
  skeleton?: boolean;
  compact?: boolean;
  data?: any;
  cardStatus: string;
  cardNumber: string;
  translations: Object;
}
declare const CardFigure: React.FC<CardFigureProps>;
export default CardFigure;

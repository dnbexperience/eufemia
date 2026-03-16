import React from 'react';
export interface CardContextState {
    isNested?: boolean;
}
declare const CardContext: React.Context<CardContextState>;
export default CardContext;

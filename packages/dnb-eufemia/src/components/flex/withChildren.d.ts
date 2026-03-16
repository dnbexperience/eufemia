import React from 'react';
type WithChildrenProps = {
    children?: React.ReactNode;
};
declare function withChildren<T>(Component: React.ComponentType<T>): React.ComponentType<T & WithChildrenProps>;
export default withChildren;

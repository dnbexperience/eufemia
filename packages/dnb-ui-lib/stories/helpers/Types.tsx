import React from 'react';
// import styled from '@emotion/styled'

// import { Button } from '../../src/components'
import Button from '../../src/components/button/Button';
import GlobalError from '../../src/components/global-error/GlobalError';
import Input from '../../src/components/input/Input';
import { H1, P } from '../../src/elements';
import { bell } from '../../src/icons';

export default {
  title: 'Eufemia/Helpers/Types'
};

export const TypesSandbox = () => {
  return (
    <div>
      <H1 size="small">Hello Eufemia</H1>
      <P>Start editing to see some magic happen!</P>
      <Button
        variant="primary"
        space={{ right: 1 }}
        right="1rem"
        icon={bell}
        on_click={() => {}}
        onKeyDown={() => {}}
      >
        Button
      </Button>
      <Input size="default">test</Input>
    </div>
  );
};

interface CommonInterface extends React.HTMLProps<HTMLElement> {
  children?: React.ReactNode;
  className?: string;
}

interface CustomProps extends CommonInterface {
  children?: React.ReactNode;
}
const Custom = ({ children }: CustomProps) => {
  return <button onKeyDown={() => {}}>{children}</button>;
};

export const TypesTesting = () => {
  return (
    <Custom
      key="unique"
      className="test"
      aria-label="test"
      disabled
      onKeyDown={() => {}}
    />
  );
};

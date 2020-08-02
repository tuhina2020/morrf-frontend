import React from 'react';
import Input from '../../../molecules/Input/index';
import Button from '../../../molecules/Button/index';
const CallBackForm = props => {
  const { setCallBackForm } = props;
  return (
    <div
      className="W(540px) H(575px) Bxsh(0px 0px 8px #0000001F)"
      style={{
        boxShadow: '0px 0px 8px #0000001f',
        margin: 'auto',
        borderRadius: '8px',
        padding: '24px',
        opacity: '1',
      }}
    >
      <div>
        <Button
          onClick={() => {
            setCallBackForm(false);
          }}
          kind="secondary"
          style={{ position: 'relative', width: '24px', height: '18px' }}
        />
      </div>
      <div style={{ height: '72px' }} />
      <div
        className="Ff($ffmanrope)"
        style={{
          fontSize: '20px',
          textAlign: 'center',
          marginTop: '24px',
          marginBottom: '48px',
        }}
      >
        Request a Call Back
      </div>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          alignContent: 'flex-start',
          justifyContent: 'flex-start',
        }}
      >
        <div style={{ height: '72px' }}>
          <Input labelText="" placeholder="Your Name" size="auto" />
        </div>
        <div style={{ height: '72px' }}>
          <Input
            size="auto"
            labelText=""
            placeholder="Your phone no."
          />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            height: '72px',
          }}
        >
          <div style={{ width: '45%' }}>
            <Input
              size="auto"
              labelText=""
              placeholder="Preferred date"
            />
          </div>
          <div style={{ width: '45%' }}>
            <Input
              size="auto"
              labelText=""
              placeholder="Preferred time"
            />
          </div>
        </div>

        <Button
          style={{ marginRight: 'auto', marginLeft: 'auto', marginTop: '24px' }}
        >
          Submit Request
        </Button>
      </form>
    </div>
  );
};

export default CallBackForm;

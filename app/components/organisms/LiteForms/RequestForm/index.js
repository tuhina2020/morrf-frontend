import React from 'react';
import Input from '../../../molecules/Input/index';
import Button from '../../../molecules/Button/index';
const RequestForm = props => {
  const { setCallBackForm } = props;

  return (
    <div
      className="W(540px) H(575px) D(f) Ai(c) Jc(c) Bxsh(0px 0px 8px #0000001F)"
      style={{
        boxShadow: '0px 0px 8px #0000001f',
        margin: 'auto',
        borderRadius: '8px',
        padding: '24px',
        opacity: '1',
      }}
    >
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          alignContent: 'flex-start',
          justifyContent: 'flex-start',
        }}
      >
        <div style={{ height: '60px' }}>
          <Input size="auto" labelText="" placeholder="Your Name" />
        </div>
        <div style={{ height: '60px' }}>
          <Input
            size="auto"
            labelText=""
            placeholder="Design specialist you are looking for"
          />
        </div>
        <div style={{ height: '100px' }}>
          <Input
            size="auto"
            labelText=""
            placeholder="Brief description of the job"
          />
        </div>
        <div style={{ height: '60px' }}>
          <Input size="auto" labelText="" placeholder="Job budget in INR" />
        </div>
        <div style={{ height: '60px' }}>
          <Input size="auto" labelText="" placeholder="Your email address" />
        </div>

        <Button
          style={{
            marginRight: 'auto',
            marginLeft: 'auto',
            marginTop: '12px',
            marginBottom: '12px',
          }}
        >
          Submit Request
        </Button>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '254px',
            marginRight: 'auto',
            marginLeft: 'auto',
            marginTop: '12px',
            marginBottom: '12px',
          }}
        >
          <hr
            width="40%"
            style={{
              opacity: '0.5',
            }}
          />
          or
          <hr
            width="40%"
            style={{
              opacity: '0.5',
            }}
          />
        </div>
        <Button
          type="button"
          onClick={() => {
            setCallBackForm(true);
          }}
          kind="secondary"
          style={{
            marginRight: 'auto',
            marginLeft: 'auto',
            marginTop: '12px',
          }}
        >
          Request a Callback
        </Button>
      </form>
    </div>
  );
};

export default RequestForm;

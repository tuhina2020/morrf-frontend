import React from 'react';
import PropTypes from 'prop-types';
import DisplayCard from 'components/molecules/DisplayCard';
import sortBy from 'lodash/sortBy';
import isEmpty from 'lodash/isEmpty';
import isNull from 'lodash/isNull';
import BaseIcon from 'components/atoms/BaseIcon';

const AddressDetails = ({ address, onAdd, onEdit, viewOnly }) => {
  const { line_1, line_2, city, state, pincode, country, proof_type } = address;
  if (isEmpty(line_1))
    return (
      <div className="Bdrs($xs) Bgc(white) W($60xl) H(fc)">
        <DisplayCard heading="Billing Details">
          <div className="D(f) Ai(c) Jc(fs) Ff($ffopensans) Fz($md)">
            <div className="W($full)">
              <div className="D(f) Fxd(r) Jc(fs)">
                <div className="Fz($md) My($xms)">
                  This address will be used in the invoices you raise
                </div>
                <div className="Fz($smd) My($xms) Mstart($xl)">
                  <BaseIcon
                    icon="add"
                    width="26px"
                    height="26px"
                    fill="#0000FF"
                    onClick={onAdd}
                  />
                  Add Address
                </div>
              </div>
            </div>
          </div>
        </DisplayCard>
      </div>
    );
  return (
    <div className="Bdrs($xs) Bgc(white) W($60xl) H(fc)">
      <DisplayCard
        heading="Billing Details"
        topRightIcon={!viewOnly ? 'edit' : ''}
        onClickIcon={onEdit}
        childPadding="Px($lg) Pt($sm)"
      >
        <div className="D(f) Ai(c) Jc(fs) Ff($ffopensans) Fz($md)">
          <div className="W($full)">
            <div className="Fw($fwbold) Fz($smx) Lh(1) Mb($xs)">
              Adress Details
            </div>
            <div className="D(f) Fxd(c) Flw(w) Jc(fs)">
              <div className="Fz($smd) My($xms)">{line_1}</div>
              <div className="Fz($smd) Mend($xs) My($xms)">{line_2}</div>
              <div className="Fz($smd) Mend($xs) My($xms)">{city}</div>
              <div className="Fz($smd) Mend($xs) My($xms)">{state}</div>
              <div className="Fz($smd) Mend($xs) My($xms)">{pincode}</div>
              <div className="Fz($smd) Mend($xs) My($xms)">{country}</div>
              <div className="Fz($smd) Mend($xs) My($xms)">{proof_type}</div>
            </div>
          </div>
        </div>
      </DisplayCard>
    </div>
  );
};

AddressDetails.propTypes = {
  address: PropTypes.object,
  onEdit: PropTypes.func,
  onAdd: PropTypes.func,
  viewOnly: PropTypes.bool,
};

AddressDetails.defaultProps = {
  viewOnly: false,
  onAdd: () => {},
  onEdit: () => {},
};
export default AddressDetails;

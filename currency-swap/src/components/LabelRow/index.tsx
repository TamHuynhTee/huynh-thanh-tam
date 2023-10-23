import React from 'react';

type Props = {
  label: React.ReactNode;
  value: React.ReactNode;
};

const LabelRow = ({ label, value }: Props) => {
  return (
    <div className="label-row">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
};

export default LabelRow;

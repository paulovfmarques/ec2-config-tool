import './DetailsCard.styles.scss';
import React, { useMemo } from 'react';
import { EC2InstancesType } from '_types';
import ServerIcon from '_assets/servers.png';

function DetailsCard({
  details: detailsArray,
  close,
}: {
  details: EC2InstancesType[];
  close: () => void;
}) {
  const [details] = useMemo(() => detailsArray, [detailsArray]);

  return (
    <div className="DetailsCard">
      <div onClick={close} className="DetailsCard__close">
        x
      </div>

      <h2 className="DetailsCard__title">
        <img height={20} width={20} src={ServerIcon} alt="server icon" />
        {details?.server_name.split(' ')[0]}
      </h2>

      <div className="DetailsCard__description-background">
        <p className="DetailsCard__description">{details?.description}</p>
      </div>

      <div className="DetailsCard__details-container">
        <div className="DetailsCard__details-wrapper">
          <p className="DetailsCard__details-title">Location:</p>
          <p className="DetailsCard__details">{details?.location}</p>
        </div>
        <div className="DetailsCard__details-wrapper">
          <p className="DetailsCard__details-title">Type:</p>
          <p className="DetailsCard__details">{details?.family}</p>
        </div>
        <div className="DetailsCard__details-wrapper">
          <p className="DetailsCard__details-title">OS:</p>
          <p className="DetailsCard__details">{details?.operating_system}</p>
        </div>
      </div>

      <div className="DetailsCard__banner">
        <div className="DetailsCard__banner-wrapper">
          <div className="DetailsCard__banner-container">
            <p className="DetailsCard__banner-label">vCPU</p>
            <div className="DetailsCard__banner-value">{details?.vcpu}</div>
          </div>
          <div className="DetailsCard__banner-container">
            <p className="DetailsCard__banner-label">Memory</p>
            <div className="DetailsCard__banner-value">{`${details?.memory} GIB`}</div>
          </div>
        </div>
      </div>

      <div className="DetailsCard__summary-wrapper">
        <details open className="DetailsCard__summary">
          <summary>Cash flows</summary>
          {details?.cashflows.map((cashflow) => (
            <div key={cashflow?.flowname}>
              <div className="DetailsCard__details-container">
                <div className="DetailsCard__details-wrapper">
                  <p className="DetailsCard__details-title">Recurring:</p>
                  <p className="DetailsCard__details">{cashflow?.recurring}</p>
                </div>
                <div className="DetailsCard__details-wrapper">
                  <p className="DetailsCard__details-title">Type:</p>
                  <p className="DetailsCard__details">{cashflow?.flowtype}</p>
                </div>
                <div className="DetailsCard__details-wrapper">
                  <p className="DetailsCard__details-title">
                    Price per server:
                  </p>
                  <div className="DetailsCard__tooltip-wrapper">
                    <p className="DetailsCard__details DetailsCard__price">
                      {`$ ${cashflow?.value_per_server}`}
                    </p>
                    <span className="DetailsCard__tooltip-text">
                      {cashflow?.flowname}
                    </span>
                  </div>
                </div>
              </div>

              <div className="DetailsCard__summary-divider" />
            </div>
          ))}
        </details>
      </div>
    </div>
  );
}

export default React.memo(DetailsCard);

import './DetailsCard.styles.scss';
import React from 'react';

function DetailsCard({ details }: { details: any }) {
  console.log(details);
  return (
    <div className="DetailsCard">
      <h2 className="DetailsCard__title">c6i.large</h2>

      <div className="DetailsCard__description-background">
        <p className="DetailsCard__description">
          Dedicated Intel Xeon 8375C (Ice Lake) @ 3.5 GHz running Windows with
          SQL Web
        </p>
      </div>

      <div className="DetailsCard__details-container">
        <div className="DetailsCard__details-wrapper">
          <p className="DetailsCard__details-title">Location:</p>
          <p className="DetailsCard__details">Asia Pacific (Tokyo)</p>
        </div>
        <div className="DetailsCard__details-wrapper">
          <p className="DetailsCard__details-title">Type:</p>
          <p className="DetailsCard__details">Compute optimized</p>
        </div>
        <div className="DetailsCard__details-wrapper">
          <p className="DetailsCard__details-title">OS:</p>
          <p className="DetailsCard__details">Windows with SQL Web</p>
        </div>
      </div>

      <div className="DetailsCard__banner">
        <div className="DetailsCard__banner-wrapper">
          <div className="DetailsCard__banner-container">
            <p className="DetailsCard__banner-label">vCPU</p>
            <div className="DetailsCard__banner-value">16</div>
          </div>
          <div className="DetailsCard__banner-container">
            <p className="DetailsCard__banner-label">Memory</p>
            <div className="DetailsCard__banner-value">12480 GIB</div>
          </div>
        </div>
      </div>

      <div className="DetailsCard__summary-wrapper">
        <details className="DetailsCard__summary" open>
          <summary>Costs</summary>

          <div className="DetailsCard__details-container">
            <div className="DetailsCard__details-wrapper">
              <p className="DetailsCard__details-title">Recurring:</p>
              <p className="DetailsCard__details">monthly</p>
            </div>
            <div className="DetailsCard__details-wrapper">
              <p className="DetailsCard__details-title">Type:</p>
              <p className="DetailsCard__details">opex</p>
            </div>
            <div className="DetailsCard__details-wrapper">
              <p className="DetailsCard__details-title">Price per server:</p>
              <div className="DetailsCard__tooltip-wrapper">
                <p className="DetailsCard__details DetailsCard__price">
                  $ 1258.52
                </p>
                <span className="DetailsCard__tooltip-text">
                  $1.724 per On Demand Linux with SQL Server Enterprise
                  t3.xlarge Instance Hour
                </span>
              </div>
            </div>
          </div>

          <div className="DetailsCard__summary-divider" />
        </details>
      </div>
    </div>
  );
}

export default React.memo(DetailsCard);

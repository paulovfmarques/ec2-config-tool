import './Header.styles.scss';
import Logo from '../../_assets/logo.svg';

export default function Header() {
  return (
    <div className="Header">
      <div className="Header__logo-wrapper">
        <img width={38} height={45} src={Logo} alt="ec2 config tool logo" />
        <h1 className="Header__heading-text">EC2 Config Tool</h1>
      </div>
    </div>
  );
}

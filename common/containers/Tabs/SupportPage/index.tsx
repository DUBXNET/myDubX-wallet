import React from 'react';

import {
  donationAddressMap,
  socialMediaLinks,
  productLinks,
  affiliateLinks,
  VERSION
} from 'config';
import translate from 'translations';
import TabSection from 'containers/TabSection';
import DisclaimerModal from 'components/DisclaimerModal';
import { NewTabLink } from 'components/ui';
import './index.scss';

interface State {
  isDisclaimerOpen: boolean;
}

export default class SupportPage extends React.Component<{}, State> {
  public state: State = {
    isDisclaimerOpen: false
  };

  public render() {
    const donationCurrencies: ['ETH', 'BTC'] = ['ETH', 'BTC'];

    return (
      <TabSection>
        <div className="SupportPage Tab-content container">
          <div className="row">
            <div className="col-xs-12">
              <div className="SupportPage-mycrypto Tab-content-pane">
                <div className="SupportPage-mycrypto-logo" />
                <p className="SupportPage-mycrypto-about">{translate('FOOTER_ABOUT')}</p>

                <div className="SupportPage-mycrypto-social">
                  {socialMediaLinks.map(link => (
                    <NewTabLink
                      className="SupportPage-mycrypto-social-link"
                      href={link.link}
                      aria-label={link.text}
                    >
                      <i className={`sm-icon sm-logo-${link.text}`} />
                    </NewTabLink>
                  ))}
                </div>

                <div className="SupportPage-mycrypto-legal">
                  <div className="SupportPage-mycrypto-legal-text">
                    © {new Date().getFullYear()} DubXNet, Inc.
                  </div>
                  <div className="SupportPage-mycrypto-legal-text">
                    <a onClick={this.openDisclaimer}>{translate('DISCLAIMER')}</a>
                  </div>
                  <div className="SupportPage-mycrypto-legal-text">v{VERSION}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 col-sm-6 col-xs-12">
              <div className="SupportPage-products Tab-content-pane">
                <h3 className="SupportPage-products-title">{translate('FOOTER_OTHER_APPS')}</h3>

                {productLinks.map(link => (
                  <NewTabLink
                    className="SupportPage-products-link btn btn-block btn-default"
                    href={link.link}
                  >
                    {link.text}
                  </NewTabLink>
                ))}
              </div>
            </div>

            <div className="col-md-6 col-sm-6 col-xs-12">
              <div className="SupportPage-affiliates Tab-content-pane">
                <h3 className="SupportPage-affiliates-title">
                  {translate('FOOTER_AFFILIATE_TITLE')}
                </h3>

                {affiliateLinks.map(link => (
                  <NewTabLink
                    className="SupportPage-affiliates-link btn btn-block btn-default"
                    href={link.link}
                  >
                    {link.text}
                  </NewTabLink>
                ))}
              </div>
            </div>
          </div>
        </div>

        <DisclaimerModal isOpen={this.state.isDisclaimerOpen} handleClose={this.closeDisclaimer} />
      </TabSection>
    );
  }

  private openDisclaimer = () => this.setState({ isDisclaimerOpen: true });
  private closeDisclaimer = () => this.setState({ isDisclaimerOpen: false });
}

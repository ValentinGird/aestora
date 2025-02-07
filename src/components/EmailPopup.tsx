import React from 'react';
import { X } from 'lucide-react';

interface EmailPopupProps {
  onClose: () => void;
  wallpaperId: string;
}

export function EmailPopup({ onClose, wallpaperId }: EmailPopupProps) {
  const thankYouUrl = `${window.location.origin}/thank-you?wallpaper=${wallpaperId}`;
  
  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-[#1a1a1a] rounded-lg p-6 w-full max-w-sm relative animate-slide-up">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <div className="ff-679762dbb32b1d435468220c" data-ff-el="root" data-ff-version="3" data-ff-type="inline" data-ff-name="inlineNoImage">
          <div data-ff-el="config" data-ff-config={`{"trigger":{"mode":"immediately","value":0},"onSuccess":{"mode":"redirect","message":"","redirectUrl":"${thankYouUrl}"},"coi":false,"showForReturnVisitors":true,"notification":true}`} style={{ display: 'none' }}></div>
          
          <div className="ff-679762dbb32b1d435468220c__container">
            <div className="ff-679762dbb32b1d435468220c__wrapper">
              <form 
                className="ff-679762dbb32b1d435468220c__form" 
                action="https://form.flodesk.com/forms/679762dbb32b1d435468220c/submit" 
                method="post" 
                data-ff-el="form"
              >
                <div className="ff-679762dbb32b1d435468220c__title">
                  <div style={{ wordBreak: 'break-word' }}>🎁 Get This 4K Anime Wallpaper</div>
                </div>
                <div className="ff-679762dbb32b1d435468220c__subtitle">
                  <div style={{ wordBreak: 'break-word' }}>Enter your email to instantly download this wallpaper in ultra-HD and get access to daily exclusive content.</div>
                </div>
                
                <div className="ff-679762dbb32b1d435468220c__content fd-form-content" data-ff-el="content">
                  <div className="ff-679762dbb32b1d435468220c__fields" data-ff-el="fields">
                    <div className="ff-679762dbb32b1d435468220c__field fd-form-group">
                      <input 
                        id="ff-679762dbb32b1d435468220c-email" 
                        className="ff-679762dbb32b1d435468220c__control fd-form-control" 
                        type="email" 
                        maxLength={255} 
                        name="email" 
                        placeholder="Email address" 
                        data-ff-tab="email::submit"
                        required 
                      />
                      <label 
                        htmlFor="ff-679762dbb32b1d435468220c-email" 
                        className="ff-679762dbb32b1d435468220c__label fd-form-label"
                      >
                        <div>
                          <div>Email address</div>
                        </div>
                      </label>
                    </div>

                    <input type="hidden" name="data[firstName]" value="" />
                    <input type="hidden" name="data[lastName]" value="" />
                    <input type="hidden" name="data[source]" value="Website Form" />
                    <input type="hidden" name="data[submitTime]" value={new Date().toISOString()} />
                    <input type="hidden" name="redirect" value={thankYouUrl} />
                  </div>

                  <div className="ff-679762dbb32b1d435468220c__footer" data-ff-el="footer">
                    <button 
                      type="submit" 
                      className="ff-679762dbb32b1d435468220c__button fd-btn" 
                      data-ff-el="submit" 
                      data-ff-tab="submit"
                    >
                      <span>📥 Download in 4K Now!</span>
                    </button>
                  </div>
                </div>

                <div className="ff-679762dbb32b1d435468220c__success fd-form-success" data-ff-el="success">
                  <div className="ff-679762dbb32b1d435468220c__success-message">
                    <div>
                      <div>
                        <div data-paragraph="true">Thank you! Your wallpaper is downloading...</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="ff-679762dbb32b1d435468220c__error fd-form-error" data-ff-el="error"></div>
              </form>
            </div>
          </div>
        </div>

        <script dangerouslySetInnerHTML={{
          __html: `
            (function(w, d, t, h, s, n) {
              w.FlodeskObject = n;
              var fn = function() {
                (w[n].q = w[n].q || []).push(arguments);
              };
              w[n] = w[n] || fn;
              var f = d.getElementsByTagName(t)[0];
              var v = '?v=' + Math.floor(new Date().getTime() / (120 * 1000)) * 60;
              var sm = d.createElement(t);
              sm.async = true;
              sm.type = 'module';
              sm.src = h + s + '.mjs' + v;
              f.parentNode.insertBefore(sm, f);
              var sn = d.createElement(t);
              sn.async = true;
              sn.noModule = true;
              sn.src = h + s + '.js' + v;
              f.parentNode.insertBefore(sn, f);
            })(window, document, 'script', 'https://assets.flodesk.com', '/universal', 'fd');
            
            window.fd('form:handle', {
              formId: '679762dbb32b1d435468220c',
              rootEl: '.ff-679762dbb32b1d435468220c'
            });
          `
        }} />
      </div>
    </div>
  );
}
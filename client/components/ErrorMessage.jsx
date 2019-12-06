import React from 'react';

export const ErrorMessage = ({ error }) =>
    <div className="sixteen wide computer sixteen wide mobile sixteen wide tablet column">
        <h4 className="ui header">RAMP API</h4>
        {error}
        <p>Install this add-on through the Heroku Add-on Marketplace</p>
        <a href="https://elements.heroku.com/addons/ramp" class="ui button primary">Go to Add-on</a>
    </div>
export default ErrorMessage;
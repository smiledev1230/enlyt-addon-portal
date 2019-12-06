import { Router } from 'express';
import { Client } from 'rest-facade';
const router = Router();
import { RAMP_VERIFICATION_API } from '../../config/constants';

const loginClient = new Client(`${RAMP_VERIFICATION_API}/addon/ramp/sso`);

router.post('/', function(req, res) {
    console.log('******* req.body ******** ' + JSON.stringify(req.body));
    const loginForm = req.body;
    const resourceId = loginForm.resource_id || loginForm.id;
    const token = loginForm.resource_token || loginForm.token;

    const loginRequest = {
        resourceId: resourceId,
        token: token,
        timestamp: loginForm.timestamp
    }

    console.log('##loginRequest' + JSON.stringify(loginRequest))
    loginClient.create(loginRequest).then((response) => {
        console.log(response);
        req.session.herokuSSO = true;
        req.session.resourceId = resourceId;
        req.session.token = response.token;
        req.session['heroku-nav-data'] = loginForm['nav-data'];
        req.session.email = loginForm.email;
        req.session.app = loginForm.app;
        req.session.active = response.active;
        res.redirect(`/dashboard`);
    }).catch((err)=>{
        console.error(err);
        res.status(500).redirect(`/dashboard`);
    })
});

export default router;

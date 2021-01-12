import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { verify } from '../../Actions/auth';

const Activate = ({ verify, match }) => {
    const [verified, setVerified] = useState(false);

    const verify_account = async (e) => {
        const uid = match.params.uid;
        const token = match.params.token;

        await verify(uid, token);
        alert(token)
        setVerified(true);
    };

    if (verified)
        return <Redirect to='/profile' />
    return (
        <div className='container'>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column',marginTop: '200px' }}>
                <h1>Verify your Account:</h1>
                <button 
                    onClick={verify_account}
                    style={{ marginTop: '50px' }}
                    type="button"
                    className="btn btn-primary"
                >
                    Verify
                </button>
            </div>
        </div>
    );
};

export default connect(null, { verify })(Activate);
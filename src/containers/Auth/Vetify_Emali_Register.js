import React from 'react';
import {useNavigate, useParams } from 'react-router';
import { path } from '../../utils/constant';
import Swal from 'sweetalert2';
import { DeleteRegisteEmailToken } from '../../ServicesAPI/User';
const Vetify_Emali_Register =() => {
    const { status,token } = useParams();
    const navigate = useNavigate();
    if(status === 'success' && token) {
        Swal.fire('Success','Redirect to login','success')
        .then(async() => {
            await DeleteRegisteEmailToken(token);
            navigate(`${path.LOGIN}`);
        })
    }
    else {
        Swal.fire('Fail','Some thing went wrong','error')
        .then(() => {
            navigate(`${path.LOGIN}`);
        })
    }
}

export default Vetify_Emali_Register;
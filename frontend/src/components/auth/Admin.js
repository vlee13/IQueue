import React, { useState, useContext } from 'react';
import actions from '../../api'

const Admin = ({ admin }) => {

    const [cohort, setCohort] = useState('')
    const [points, setPoints] = useState(0)
    const [status, setStatus] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(cohort, points)

        let areYourSure = window.confirm(`Are you sure you want to reset ${cohort} to ${points}`)
        if (areYourSure) {
            actions.resetCohortPoints({ cohort, points }).then(res => {
                console.log('reset', res)
                setStatus(res.data.cohort)
            }).catch(err => console.error(err))
        }
    }

    console.log(admin)
    if (!admin)
        return <h3>You're not an admin</h3>

    return (
        <div>
            Admin Page {JSON.stringify(status)}
            <form onSubmit={handleSubmit}>
                <label>Set cohort points:</label>
                <input required onChange={(e) => setCohort(e.target.value)} type="text" placeholder="FTWD-AUG-2020" />
                <input required onChange={(e) => setPoints(e.target.value)} type="number" placeholder="0" />
                <button>Submit</button>
            </form>
        </div>
    );
};

export default Admin;
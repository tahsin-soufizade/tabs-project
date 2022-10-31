import { useEffect } from 'react';
import { useState } from 'react';
import '../scss/tabs.scss';
import { FaAngleDoubleRight } from 'react-icons/fa';

const url = 'https://course-api.com/react-tabs-project';
const Tabs = () => {
    const [loading, setLoading] = useState(true);
    const [jobs, setJobs] = useState([]);
    const [value, setValue] = useState(0);

    useEffect(() => {
        const fetchJobs = async () => {
            const response = await fetch(url);
            const newJobs = await response.json();
            setJobs(newJobs);
            setLoading(false);
        }

        fetchJobs();
    }, []);

    const job = jobs[value];

    return (
        <div>
            {loading && <h3 className='text-center text-danger'>Loading...</h3>}
            {jobs.length > 0 && (
                <div className="jobs-container">
                    <div className="container">
                        <div className="row">
                            {/* BUTTONS CONTAINER */}
                            <div className="col-4">
                                <div className="job-buttons-container">
                                    {jobs.map((item, index) => <button
                                        className={`job-btn ${index === value ? 'active' : ''}`}
                                        key={item.id}

                                        onClick={() => setValue(index)} >{item.company}
                                    </button>)}
                                </div>
                            </div>

                            {/* JOBS INFO */}
                            <div className="col-8">
                                <div className="job-info-wrapper">
                                    <h3 className='job-title'>{job.title}</h3>
                                    <span className='job-company'>{job.company}</span>
                                    <p className='job-date'>{job.dates}</p>
                                    <div className="job-description-wrapper">
                                        {job.duties.map((duty, index) => {
                                            return (
                                                <div key={index} className="job-description-item">
                                                    <FaAngleDoubleRight className='job-icon' />
                                                    <p className='description-text'>{duty}</p>
                                                </div>)
                                        })}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            )}
        </div>
    );
}

export default Tabs;
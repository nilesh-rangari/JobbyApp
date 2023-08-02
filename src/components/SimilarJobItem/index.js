import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobItem = props => {
  const {similarJobs} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    title,
    rating,
  } = similarJobs
  return (
    <li className="similarJob_container">
      <div className="companyLogo_jobTitle_Rating">
        <img
          className="company_Logo"
          src={companyLogoUrl}
          alt="similar job company logo"
        />
        <div className="jobTitle_rating_container">
          <h1 className="jobTitle">{title}</h1>
          <div className="rating_container">
            <AiFillStar className="rating_icons" />
            <p className="rating_text">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="description_heading">Description</h1>
      <p className="description_text">{jobDescription}</p>
      <div className="location_empType_container">
        <div className="location_empType">
          <div className="location">
            <MdLocationOn className="job_icons" />
            <p className="job_icons_text">{location}</p>
          </div>
          <div className="empType">
            <BsBriefcaseFill className="job_icons" />
            <p className="job_icons_text">{employmentType}</p>
          </div>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobItem

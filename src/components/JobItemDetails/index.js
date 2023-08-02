import {Component} from 'react'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiExternalLink} from 'react-icons/fi'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import SimilarJobItem from '../SimilarJobItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {
    jobData: {},
    similarJobsData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobItem()
  }

  getFormattedData = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    lifeAtCompany: {
      description: data.life_at_company.description,
      imageUrl: data.life_at_company.image_url,
    },
    location: data.location,
    rating: data.rating,
    title: data.title,
    packagePerAnnum: data.package_per_annum,
    skills: data.skills.map(eachSkill => ({
      imageUrl: eachSkill.image_url,
      name: eachSkill.name,
    })),
  })

  getJobItem = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    console.log(response)
    if (response.ok === true) {
      const fetchData = await response.json()
      const updatedData = this.getFormattedData(fetchData.job_details)
      const updatedSkillData = fetchData.similar_jobs.map(eachSimilarJob => ({
        companyLogoUrl: eachSimilarJob.company_logo_url,
        employmentType: eachSimilarJob.employment_type,
        id: eachSimilarJob.id,
        jobDescription: eachSimilarJob.job_description,
        location: eachSimilarJob.location,
        rating: eachSimilarJob.rating,
        title: eachSimilarJob.title,
      }))
      this.setState({
        jobData: updatedData,
        similarJobsData: updatedSkillData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderJobDetailsView = () => {
    const {jobData} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      title,
      rating,
      packagePerAnnum,
      lifeAtCompany,
      skills,
    } = jobData
    const {description, imageUrl} = lifeAtCompany

    return (
      <div className="jobDetailsView_container">
        <div className="companyDetails_container">
          <img
            className="company_Logo"
            src={companyLogoUrl}
            alt="job details company logo"
          />
          <div className="jobTitle_rating_container">
            <h1 className="jobTitle">{title}</h1>
            <div className="rating_container">
              <AiFillStar className="rating_icons" />
              <p className="rating_text">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location_empType_package_container">
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
          <div className="package">
            <p className="package_text">{packagePerAnnum}</p>
          </div>
        </div>
        <hr className="line" />
        <div className="description_container">
          <div className="description">
            <h1 className="description_heading">Description</h1>
            <div className="visit_container">
              <a href={companyWebsiteUrl} className="visit_Link">
                Visit
              </a>
              <FiExternalLink className="visit_icon" />
            </div>
          </div>
          <p className="description_text">{jobDescription}</p>
        </div>
        <h1 className="skills_heading">Skills</h1>
        <ul className="skills_container">
          {skills.map(eachSkill => (
            <li className="skills" key={eachSkill.id}>
              <img
                className="skill_image"
                src={eachSkill.imageUrl}
                alt={eachSkill.name}
              />
              <h1 className="skill_name">{eachSkill.name}</h1>
            </li>
          ))}
        </ul>
        <h1 className="lifeAtCompany_heading">Life at Company</h1>
        <div className="lifeAtCompany_container">
          <p className="lifeAtCompany_description">{description}</p>
          <img
            className="lifeAtCompany_image"
            src={imageUrl}
            alt="life at company"
          />
        </div>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failureView_container">
      <img
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        className="failureView_image"
      />
      <h1 className="failureView_heading">Oops! Something Went Wrong</h1>
      <p className="failureView_description">
        We cannot seem to find the page you are looking for.
      </p>
      <button className="retry_button" type="button" onClick={this.getJobItem}>
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div data-testid="loader" className="profile-loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetailsView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {similarJobsData} = this.state
    return (
      <div className="bg_container">
        <Header />
        {this.renderJobViews()}
        <div className="similarJobs_container">
          <h1 className="similarJob_heading">Similar Jobs</h1>
          <ul className="similar_card">
            {similarJobsData.map(eachItem => (
              <SimilarJobItem key={eachItem.id} similarJobs={eachItem} />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default JobItemDetails

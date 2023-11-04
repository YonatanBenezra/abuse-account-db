import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./abuse-profile-form.scss";
export default function AbuseProfileForm() {
  const [categories, setCategories] = useState([]);
  const [dbLength, setDbLength] = useState(0);
  const { register, handleSubmit, reset } = useForm();

  const checkDbLength = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/abuseprofiles/`)
      .then((response) => setDbLength(response.data.data.data.length));
  };

  useEffect(() => {
    checkDbLength();
  }, []);

  const onSubmit = (data) => {
    data.categories = categories;
    axios
      .post(`${import.meta.env.VITE_API_URL}/api/abuseprofiles/`, data)
      .then(() => {
        checkDbLength();
        reset();
        setCategories([]);
      });
  };
  const onChange = (event) => {
    categories.includes(event.target.id)
      ? setCategories(categories.filter((e) => e !== event.target.id))
      : setCategories([...categories, event.target.checked && event.target.id]);
  };
  return (
    <div className="form-container">
      <div className="accounts-counter">
        <h1>Accounts reported</h1>
        <h2>{dbLength}</h2>
      </div>
      <h1 className="form-title">Report Account</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-section">
          <h3>Account URL</h3>
          <input
            className="form-input"
            {...register("profileLink", {
              required: true,
              pattern:
                /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
            })}
          />
        </div>
        <div className="form-section">
          <h3>Categories</h3>
          <div className="checkbox-grid">
            <span className="checkbox-item">
              <label htmlFor="fraud">Fraud</label>
              <input
                className="form-checkbox"
                name="fraud"
                id="fraud"
                type="checkbox"
                onChange={onChange}
              />
            </span>
            <span className="checkbox-item">
              <label htmlFor="spam">spam</label>
              <input
                className="form-checkbox"
                name="spam"
                id="spam"
                type="checkbox"
                onChange={onChange}
              />
            </span>
            <span className="checkbox-item">
              <label htmlFor="IdentityTheft">Identity Theft</label>
              <input
                className="form-checkbox"
                name="IdentityTheft"
                id="IdentityTheft"
                type="checkbox"
                onChange={onChange}
              />
            </span>
            <span className="checkbox-item">
              <label htmlFor="Cyberbullying">Cyber bullying</label>
              <input
                className="form-checkbox"
                name="Cyberbullying"
                id="Cyberbullying"
                type="checkbox"
                onChange={onChange}
              />
            </span>
          </div>
          <div className="checkbox-grid">
            <span className="checkbox-item">
              <label htmlFor="PhishingScams">Phishing Scams</label>
              <input
                className="form-checkbox"
                name="PhishingScams"
                id="PhishingScams"
                type="checkbox"
                onChange={onChange}
              />
            </span>
            <span className="checkbox-item">
              <label htmlFor="Propaganda">Propaganda</label>
              <input
                className="form-checkbox"
                name="Propaganda"
                id="Propaganda"
                type="checkbox"
                onChange={onChange}
              />
            </span>
            <span className="checkbox-item">
              <label htmlFor="FakeNews">Fake News</label>
              <input
                className="form-checkbox"
                name="FakeNews"
                id="FakeNews"
                type="checkbox"
                onChange={onChange}
              />
            </span>
            <span className="checkbox-item">
              <label htmlFor="IntellectualPropertyTheft">
                Intellectual Property Theft
              </label>
              <input
                className="form-checkbox"
                name="IntellectualPropertyTheft"
                id="IntellectualPropertyTheft"
                type="checkbox"
                onChange={onChange}
              />
            </span>
          </div>
          <div className="checkbox-grid">
            <span className="checkbox-item">
              <label htmlFor="PrivacyInvasion">Privacy Invasion</label>
              <input
                className="form-checkbox"
                name="PrivacyInvasion"
                id="PrivacyInvasion"
                type="checkbox"
                onChange={onChange}
              />
            </span>
            <span className="checkbox-item">
              <label htmlFor="Scamming">Scamming</label>
              <input
                className="form-checkbox"
                name="Scamming"
                id="Scamming"
                type="checkbox"
                onChange={onChange}
              />
            </span>
            <span className="checkbox-item">
              <label htmlFor="AccountHijacking">Account Hijacking</label>
              <input
                className="form-checkbox"
                name="AccountHijacking"
                id="AccountHijacking"
                type="checkbox"
                onChange={onChange}
              />
            </span>
            <span className="checkbox-item">
              <label htmlFor="MalwareDistribution">Malware Distribution</label>
              <input
                className="form-checkbox"
                name="MalwareDistribution"
                id="MalwareDistribution"
                type="checkbox"
                onChange={onChange}
              />
            </span>
          </div>
          <div className="checkbox-grid">
            <span className="checkbox-item">
              <label htmlFor="Sextortion">Sextortion</label>
              <input
                className="form-checkbox"
                name="Sextortion"
                id="Sextortion"
                type="checkbox"
                onChange={onChange}
              />
            </span>
            <span className="checkbox-item">
              <label htmlFor="TerroristActivities">Terrorist Activities</label>
              <input
                className="form-checkbox"
                name="TerroristActivities"
                id="TerroristActivities"
                type="checkbox"
                onChange={onChange}
              />
            </span>
            <span className="checkbox-item">
              <label htmlFor="HumanTrafficking">Human Trafficking</label>
              <input
                className="form-checkbox"
                name="HumanTrafficking"
                id="HumanTrafficking"
                type="checkbox"
                onChange={onChange}
              />
            </span>
            <span className="checkbox-item">
              <label htmlFor="Doxxing">Doxxing</label>
              <input
                className="form-checkbox"
                name="Doxxing"
                id="Doxxing"
                type="checkbox"
                onChange={onChange}
              />
            </span>
          </div>
          <div className="checkbox-grid">
            <span className="checkbox-item">
              <label htmlFor="Bias">Bias</label>
              <input
                className="form-checkbox"
                name="Bias"
                id="Bias"
                type="checkbox"
                onChange={onChange}
              />
            </span>
            <span className="checkbox-item">
              <label htmlFor="Antisemic">Antisemic</label>
              <input
                className="form-checkbox"
                name="Antisemic"
                id="Antisemic"
                type="checkbox"
                onChange={onChange}
              />
            </span>
            <span className="checkbox-item">
              <label htmlFor="FakeNews">Fake News</label>
              <input
                className="form-checkbox"
                name="FakeNews"
                id="FakeNews"
                type="checkbox"
                onChange={onChange}
              />
            </span>
            <span className="checkbox-item">
              <label htmlFor="Phonzi">Phonzi</label>
              <input
                className="form-checkbox"
                name="Phonzi"
                id="Phonzi"
                type="checkbox"
                onChange={onChange}
              />
            </span>
          </div>
          <div className="checkbox-grid">
            <span className="checkbox-item">
              <label htmlFor="CryptoFraud">Crypto Fraud</label>
              <input
                className="form-checkbox"
                name="CryptoFraud"
                id="CryptoFraud"
                type="checkbox"
                onChange={onChange}
              />
            </span>
          </div>
        </div>
        <div className="form-section">
          <h3>Comment</h3>
          <textarea
            className="form-textarea"
            {...register("comment", { maxLength: 1200 })}
          />
        </div>
        <input className="form-submit" type="submit" />
      </form>
    </div>
  );
}

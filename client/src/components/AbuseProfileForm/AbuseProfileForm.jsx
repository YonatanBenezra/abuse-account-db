import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./abuse-profile-form.scss";
import { useNavigate } from "react-router-dom";
export default function AbuseProfileForm() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [dbLength, setDbLength] = useState(0);
  const { register, handleSubmit, reset } = useForm();

  const checkDbLength = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/abuseprofiles/`)
      .then((response) => setDbLength(response.data.data.data.length));
  };

  useEffect(() => {
    localStorage.getItem("token") ? "" : navigate("/login");
    checkDbLength();
  }, []);

  const onSubmit = (data) => {
    if (categories.length > 0) {
      data.categories = categories;
      data.uploadedBy = localStorage.getItem("loggedUser");
      axios
        .post(`${import.meta.env.VITE_API_URL}/api/abuseprofiles/`, data)
        .then(() => {
          checkDbLength();
          reset();
          setCategories([]);
          alert("report created successfully");
        });
    } else {
      alert("please contain at least 1 category");
    }
  };
  const onChange = (event) => {
    categories.includes(event.target.id)
      ? setCategories(categories.filter((e) => e !== event.target.id))
      : setCategories([...categories, event.target.checked && event.target.id]);
  };
  return (
    <div className="form-container">
      {/* <div className="accounts-counter">
        <h1>Accounts reported</h1>
        <h2>{dbLength}</h2>
      </div> */}
      <h1 className="form-title">Report Account</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-section">
          <h3 className="text-semi-white form-header">Abusive account URL<span className="text-red-700">*</span></h3>
          <input
            className="form-input"
            placeholder="https://"
            {...register("profileLink", {
              required: true,
              pattern:
                /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
            })}
          />
        </div>
        <div className="form-section">
          <h3 className="text-semi-white form-header">Abusive post URL<span className="text-red-700">*</span></h3>
          <input
            className="form-input"
            placeholder="https://"
            {...register("linkToPost", {
              required: true,
              pattern:
                /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
            })}
          />
        </div>
        <hr className="text-semi-white" />
        <div className="form-section">
          <h3 className="text-semi-white form-header">
            Choose report reason(s)<span className="text-red-700">*</span>
          </h3>
          <div className="checkbox-grid">
            <span className="checkbox-item">
              <label
                htmlFor="fraud"
                className={categories.includes("fraud") && "active-checkbox"}
              >
                Fraud
              </label>
              <input
                className="form-checkbox"
                name="fraud"
                id="fraud"
                type="checkbox"
                onChange={onChange}
              />
            </span>
            <span className="checkbox-item">
              <label
                htmlFor="spam"
                className={categories.includes("spam") && "active-checkbox"}
              >
                spam
              </label>
              <input
                className="form-checkbox"
                name="spam"
                id="spam"
                type="checkbox"
                onChange={onChange}
              />
            </span>
            <span className="checkbox-item">
              <label
                htmlFor="IdentityTheft"
                className={
                  categories.includes("IdentityTheft") && "active-checkbox"
                }
              >
                Identity Theft
              </label>
              <input
                className="form-checkbox"
                name="IdentityTheft"
                id="IdentityTheft"
                type="checkbox"
                onChange={onChange}
              />
            </span>
            <span className="checkbox-item">
              <label
                htmlFor="Cyberbullying"
                className={
                  categories.includes("Cyberbullying") && "active-checkbox"
                }
              >
                Cyber bullying
              </label>
              <input
                className="form-checkbox"
                name="Cyberbullying"
                id="Cyberbullying"
                type="checkbox"
                onChange={onChange}
              />
            </span>
            <span className="checkbox-item">
              <label
                htmlFor="PhishingScams"
                className={
                  categories.includes("PhishingScams") && "active-checkbox"
                }
              >
                Phishing Scams
              </label>
              <input
                className="form-checkbox"
                name="PhishingScams"
                id="PhishingScams"
                type="checkbox"
                onChange={onChange}
              />
            </span>
            <span className="checkbox-item">
              <label
                htmlFor="Propaganda"
                className={
                  categories.includes("Propaganda") && "active-checkbox"
                }
              >
                Propaganda
              </label>
              <input
                className="form-checkbox"
                name="Propaganda"
                id="Propaganda"
                type="checkbox"
                onChange={onChange}
              />
            </span>
            <span className="checkbox-item">
              <label
                htmlFor="FakeNews"
                className={categories.includes("FakeNews") && "active-checkbox"}
              >
                Fake News
              </label>
              <input
                className="form-checkbox"
                name="FakeNews"
                id="FakeNews"
                type="checkbox"
                onChange={onChange}
              />
            </span>
            <span className="checkbox-item">
              <label
                htmlFor="IntellectualPropertyTheft"
                className={
                  categories.includes("IntellectualPropertyTheft") &&
                  "active-checkbox"
                }
              >
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
            <span className="checkbox-item">
              <label
                htmlFor="PrivacyInvasion"
                className={
                  categories.includes("PrivacyInvasion") && "active-checkbox"
                }
              >
                Privacy Invasion
              </label>
              <input
                className="form-checkbox"
                name="PrivacyInvasion"
                id="PrivacyInvasion"
                type="checkbox"
                onChange={onChange}
              />
            </span>
            <span className="checkbox-item">
              <label
                htmlFor="Scamming"
                className={categories.includes("Scamming") && "active-checkbox"}
              >
                Scamming
              </label>
              <input
                className="form-checkbox"
                name="Scamming"
                id="Scamming"
                type="checkbox"
                onChange={onChange}
              />
            </span>
            <span className="checkbox-item">
              <label
                htmlFor="AccountHijacking"
                className={
                  categories.includes("AccountHijacking") && "active-checkbox"
                }
              >
                Account Hijacking
              </label>
              <input
                className="form-checkbox"
                name="AccountHijacking"
                id="AccountHijacking"
                type="checkbox"
                onChange={onChange}
              />
            </span>
            <span className="checkbox-item">
              <label
                htmlFor="MalwareDistribution"
                className={
                  categories.includes("MalwareDistribution") &&
                  "active-checkbox"
                }
              >
                Malware Distribution
              </label>
              <input
                className="form-checkbox"
                name="MalwareDistribution"
                id="MalwareDistribution"
                type="checkbox"
                onChange={onChange}
              />
            </span>
            <span className="checkbox-item">
              <label
                htmlFor="Sextortion"
                className={
                  categories.includes("Sextortion") && "active-checkbox"
                }
              >
                Sextortion
              </label>
              <input
                className="form-checkbox"
                name="Sextortion"
                id="Sextortion"
                type="checkbox"
                onChange={onChange}
              />
            </span>
            <span className="checkbox-item">
              <label
                htmlFor="TerroristActivities"
                className={
                  categories.includes("TerroristActivities") &&
                  "active-checkbox"
                }
              >
                Terrorist Activities
              </label>
              <input
                className="form-checkbox"
                name="TerroristActivities"
                id="TerroristActivities"
                type="checkbox"
                onChange={onChange}
              />
            </span>
            <span className="checkbox-item">
              <label
                htmlFor="HumanTrafficking"
                className={
                  categories.includes("HumanTrafficking") && "active-checkbox"
                }
              >
                Human Trafficking
              </label>
              <input
                className="form-checkbox"
                name="HumanTrafficking"
                id="HumanTrafficking"
                type="checkbox"
                onChange={onChange}
              />
            </span>
            <span className="checkbox-item">
              <label
                htmlFor="Doxxing"
                className={categories.includes("Doxxing") && "active-checkbox"}
              >
                Doxxing
              </label>
              <input
                className="form-checkbox"
                name="Doxxing"
                id="Doxxing"
                type="checkbox"
                onChange={onChange}
              />
            </span>
            <span className="checkbox-item">
              <label
                htmlFor="Bias"
                className={categories.includes("Bias") && "active-checkbox"}
              >
                Bias
              </label>
              <input
                className="form-checkbox"
                name="Bias"
                id="Bias"
                type="checkbox"
                onChange={onChange}
              />
            </span>
            <span className="checkbox-item">
              <label
                htmlFor="Antisemic"
                className={
                  categories.includes("Antisemic") && "active-checkbox"
                }
              >
                Antisemic
              </label>
              <input
                className="form-checkbox"
                name="Antisemic"
                id="Antisemic"
                type="checkbox"
                onChange={onChange}
              />
            </span>
            <span className="checkbox-item">
              <label
                htmlFor="FakeProfile"
                className={
                  categories.includes("FakeProfile") && "active-checkbox"
                }
              >
                Fake Profile
              </label>
              <input
                className="form-checkbox"
                name="FakeProfile"
                id="FakeProfile"
                type="checkbox"
                onChange={onChange}
              />
            </span>
            <span className="checkbox-item">
              <label
                htmlFor="Phonzi"
                className={categories.includes("Phonzi") && "active-checkbox"}
              >
                Phonzi
              </label>
              <input
                className="form-checkbox"
                name="Phonzi"
                id="Phonzi"
                type="checkbox"
                onChange={onChange}
              />
            </span>
            <span className="checkbox-item">
              <label
                htmlFor="CryptoFraud"
                className={
                  categories.includes("CryptoFraud") && "active-checkbox"
                }
              >
                Crypto Fraud
              </label>
              <input
                className="form-checkbox"
                name="CryptoFraud"
                id="CryptoFraud"
                type="checkbox"
                onChange={onChange}
              />
            </span>
            <span className="checkbox-item">
              <label
                htmlFor="PyramidScheme"
                className={
                  categories.includes("PyramidScheme") && "active-checkbox"
                }
              >
                Pyramid Scheme
              </label>
              <input
                className="form-checkbox"
                name="PyramidScheme"
                id="PyramidScheme"
                type="checkbox"
                onChange={onChange}
              />
            </span>
          </div>
        </div>
        <hr />
        <div className="form-section">
          <h3 className="text-semi-white form-header">Comment</h3>
          <textarea
            className="form-textarea"
            {...register("comment", { maxLength: 1200 })}
          />
        </div>
        <input className="form-submit" type="submit" value="Send report" />
        <button
          className="cancel-button"
          onClick={() => {
            reset();
            setCategories([]);
          }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

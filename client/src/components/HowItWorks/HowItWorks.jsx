import "./howItWorks.scss";
const HowItWorks = () => {
  return (
    <div className="how-it-works-container">
      <h1>How Does AbuseHunters Work?</h1>
      <div>
        <p>
          At AbuseHunters.com, our process is designed to be straightforward yet
          effective, empowering users to play an active role in maintaining the
          authenticity of social media platforms. Here’s how our system
          operates:
        </p>
        <p>
          User Reports: The journey begins with users like you. When you come
          across a social media profile that seems fake or dubious, you can
          report it directly on our platform. Reporting is simple and
          user-friendly, requiring just a few clicks.
        </p>
        <p>
          Accumulation of Reports: Each report contributes to the profile’s
          overall suspicion score. As more users report the same profile, the
          confidence level in its potential for abuse increases. This communal
          effort is crucial in identifying and validating suspicious accounts.
        </p>
        <p>
          Scoring System: Our unique scoring system evaluates each profile based
          on the number of reports it receives. The more reports a profile
          accumulates, the higher its abuse confidence score becomes. This score
          is a dynamic indicator of the profile's credibility, constantly
          updated as new reports are received.
        </p>
        <p>
          Reaching the Threshold: Once a profile's abuse confidence score
          reaches 100%, it is flagged as a high-risk account. This threshold
          indicates a strong consensus among the community about the profile's
          lack of authenticity.
        </p>
        <p>
          Validation and Reporting to Social Media Providers: Profiles that hit
          the 100% mark undergo a final validation check by our team. This step
          ensures that the reports are legitimate and not the result of
          coordinated false reporting. After validation, these profiles are
          reported to the relevant social media providers for further action,
          typically resulting in the suspension or removal of the account.
        </p>
        <p>
          Continuous Monitoring: Our system continually monitors and updates the
          scores of profiles, reflecting any new reports or changes. This
          ongoing process ensures that our platform remains a current and
          reliable resource for identifying fake accounts.
        </p>
        <p>
          By leveraging the collective vigilance of our users and our
          sophisticated scoring system, AbuseHunters.com provides a robust and
          democratic solution to the challenge of fake social media accounts.
          Together, we can help maintain the authenticity and trustworthiness of
          online interactions.
        </p>
      </div>
    </div>
  );
};

export default HowItWorks;

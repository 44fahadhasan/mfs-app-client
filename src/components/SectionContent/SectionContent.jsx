import PropTypes from "prop-types";
const SectionContent = ({ title, topContent }) => {
  return (
    <div className="poppins text-center space-y-3">
      {topContent && (
        <p className="text-base text-primary font-medium uppercase">
          {topContent}
        </p>
      )}
      <h2 className="text-2xl sm:text-4xl font-bold text-base-content">
        {title}
      </h2>
    </div>
  );
};

SectionContent.propTypes = {
  title: PropTypes.string,
  topContent: PropTypes.string,
};

export default SectionContent;

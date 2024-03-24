import { StyledContactBoxWrapper } from "./styles";

const ContactBox = () => {
  return (
    <StyledContactBoxWrapper>
      <p>
        This project is open source and available on{" "}
        <a
          href="https://github.com/amanda-natallie/minesweeper"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </p>
    </StyledContactBoxWrapper>
  );
};

export default ContactBox;

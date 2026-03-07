import styled from "styled-components";

export const PageWrapper = styled.div`
  padding: 2.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;      

  @media only screen and (max-width: 1000px) {
    padding: 2rem 1.25rem;
  }
`;

export const PostTopBar = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 0 auto 1.5rem;
  display: flex;
  justify-content: flex-start;
`;

export const PostContainer = styled.article`
  position: relative;
  width: 100%;
  max-width: 900px;
  padding: 2.5rem 3rem 3rem;
  background: ${({ theme }) => theme.background};
  border-radius: 1.5rem;
  box-sizing: border-box;

  @media only screen and (max-width: 1000px) {
    padding: 2rem 1.75rem 2.5rem;
  }
`;

export const HeaderRow = styled.header`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: 2.8rem;
`;

export const IconWrapper = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 1rem;
  padding-bottom: 0.6rem;
  margin: 0 0 2em auto;
`;

export const HeaderIcon = styled.div`
  max-width: 6.4rem;
  max-height: 6.4rem;
  min-width: 4.4rem;
  min-height: 4.4rem;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 100%;
    height: 100%;
  }

  @media only screen and (max-width: 1000px) {
    width: 3.6rem;
    height: 3.6rem;
  }
`;

export const PostImage = styled.img`
  width: 100%;
  margin: 1.8rem 0 0.8rem;
  border-radius: 0.8rem;
`;

export const InlinePostImage = styled(PostImage)`
  max-width: 400px;

  @media only screen and (max-width: 700px) {
    max-width: 100%;
  }
`;

export const ContentRow = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin: 1.5rem 0;

  @media only screen and (max-width: 700px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const ContentRowTop = styled(ContentRow)`
  align-items: flex-start;
`;
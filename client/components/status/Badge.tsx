import styled from "styled-components";
import { ShadowBox } from "../components";

export const BadgeColors = {
  right: "#00a23d",
  wrong: "#f00",
  learn: "#ff9000",
  create: "#8884d8",
  update: "#82ca9d",
  delete: "#0f8181"
};

const StyledBadge = styled(ShadowBox)`
  color: white;
  padding: 0.5rem;
  margin: 0.3rem;
  border-radius: 0.5rem;
  display: inline-block;
  background-color: ${props => (props.color ? props.color : "grey")};
`;

export const Badge = (props: { color?: string; children: any }) => (
  <StyledBadge color={props.color}>{props.children}</StyledBadge>
);

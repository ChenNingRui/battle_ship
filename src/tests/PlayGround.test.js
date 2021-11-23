import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, cleanup, screen } from '@testing-library/react';
import DeploymentBar from "../components/DeploymentBar";
import PlayGround from "../components/PlayGround";
import PlayingBar from "../components/PlayingBar";

afterEach(cleanup);

test('the start of the scoreboard is 0 vs 0', () => {
  render(<PlayGround />)
  const playerScpre = screen.getByText(/You:/i);
  const computerScore = screen.getByText(/Computer:/i);

  expect(playerScpre).toBeInTheDocument();
  expect(computerScore).toBeInTheDocument();
  expect(playerScpre).toHaveTextContent(`You: 0`);
  expect(computerScore).toHaveTextContent(`Computer: 0`);
});

test("should take a snapshot of PlayingBar", () => {
  const { asFragment } = render(<PlayingBar />);

  expect(asFragment(<PlayingBar />)).toMatchSnapshot();
});

test("should take a snapshot of DeploymentBar", () => {
  const { asFragment } = render(<DeploymentBar />);

  expect(asFragment(<DeploymentBar />)).toMatchSnapshot();
});

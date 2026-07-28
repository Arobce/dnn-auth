"use server";

import { getKindeWidget } from "@kinde/infrastructure";
import React from "react";

type WidgetProps = {
  heading: string;
};

export const Widget: React.FC<WidgetProps> = ({ heading }) => (
  <section className="dnn-auth__card">
    <p className="dnn-auth__brand">DNN · dnn.cc</p>
    <h1 className="dnn-auth__title">{heading}</h1>
    <p className="dnn-auth__copy">Sign in with Google or email to continue.</p>

    {getKindeWidget()}

    <p className="dnn-auth__products">
      gerber.tools · pcb.market · mpn.cc · bomprice.cc
    </p>
  </section>
);

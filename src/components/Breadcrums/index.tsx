import React from "react";
import { RouteComponentProps } from "react-router-dom";
import BreadcrumbComponent from "react-rainbow-components/components/Breadcrumb";
import BreadcrumbsComponent from "react-rainbow-components/components/Breadcrumbs";

type PropsBreadcrumbs = RouteComponentProps & {
  breadcrumbs: {
    name: string;
    pathname: string;
  }[];
};

export default function Breadcrumbs(props: PropsBreadcrumbs) {
  return (
    <div className='rainbow-p-around_large'>
      <BreadcrumbsComponent>
        {props.breadcrumbs.map((breadcrumb, index) => {
          return (
            <BreadcrumbComponent 
              key={index} 
              label={breadcrumb.name} 
              onClick={() => props.history.push(breadcrumb.pathname)} 
            />
          );
        })}
      </BreadcrumbsComponent>
    </div>
  );
}

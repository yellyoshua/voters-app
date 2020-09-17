import React from 'react';
import BreadcrumbComponent from 'react-rainbow-components/components/Breadcrumb';
import BreadcrumbsComponent from 'react-rainbow-components/components/Breadcrumbs';

type PropsBreadcrumbs = {
  breadcrumbs: {
    name: string;
    pathname: string;
  }[];
  goTo: (pathname: string) => void;
};

export default function Breadcrumbs(props: PropsBreadcrumbs) {
  return (
    <div className="rainbow-p-around_large">
      <BreadcrumbsComponent>
        {
          props.breadcrumbs.map((breadcrumb, index) => {
            return <BreadcrumbComponent key={index} label={breadcrumb.name} onClick={props.goTo.bind(null, breadcrumb.pathname)} />
          })
        }
      </BreadcrumbsComponent>
    </div>
  )
}
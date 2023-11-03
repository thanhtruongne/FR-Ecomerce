import useBreadcrumbs from "use-react-router-breadcrumbs";
import React from "react";
import './Breadcrumb.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from "react-router-dom";
import _ from 'lodash'
const Breadcrumbs = ({title,category}) => {
    const routes = [
        { path: "/:category", breadcrumb: category },
        { path: "/", breadcrumb:'Home' },
        {
         path:'/:category/:pid/:title' ,breadcrumb : title},
      ];
    const breadcrumbs = useBreadcrumbs(routes);

    return (
      <React.Fragment>

       {breadcrumbs.filter(item => !_.isEmpty(item.match.route)).map(({ match, breadcrumb },index,self) => {
        return (
        <NavLink key={match.pathname} to={match.pathname}>
            <span>{breadcrumb}</span>
          {index != self.length-1 && <FontAwesomeIcon icon={faChevronRight} className="fw-light icon_cher" />} 
        </NavLink>

        )

       }
      )}
      </React.Fragment>
    );
 };

export default Breadcrumbs;
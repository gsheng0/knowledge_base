// import {classNames, classnames} from "classnames";
import classNames from "classnames";
import classnames from "classnames";

export const actionButtonClassName = classNames({
    "w-16": true, 
    "mb-2 mt-2 mr-3": true,
    "bg-blue-100": true, 
    "rounded-lg": true,  
    "border-solid": true,  
    "border-1": true, 
    "border-blue-400": true,
    "outline": true,
    "outline-offset-1": true,
    "outline-1": true,
    "hover:text-blue-800": true,
    "hover:font-extrabold": true
});

export const pageTitleClassName = classnames(
    "h-16",
    "bg-blue-50", 
    "text-center",  
    "text-3xl",  
    "font-extrabold",  
    "text-blue-800"
);

export const notesClassName = 'mb-5 text-left text-sm  bg-yellow-50 rounded-3xl outline outline-1 outline-yellow-500';
export const formLabelClassName = classnames("font-bold", "mb-0", "text-blue-800");
export const formInputClassName = classnames("w-4/5 h-8");
export const formFixedClassName = classnames("w-4/5 h-8 bg-yellow-50");

export const actionButtonBarClassName = "bg-blue-50 text-center text-lg text-blue-800 flex flex-row gap-2";

export const cardTitleClassName = "ml-2 mr-2 mb-2 text-lg text-center font-extrabold text-blue-800 ";
export const smallCardListClassName = "container mx-auto grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4";
export const cardListClassName = "container mx-auto grid lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-4";
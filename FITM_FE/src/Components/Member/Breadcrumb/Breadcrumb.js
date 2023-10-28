import { Breadcrumbs, Link, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link as RouterLink, useLocation } from "react-router-dom";

function Breadcrumb({ breadcrumbNameMap }) {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x);

    function formatString(str) {
        str = str[0].toUpperCase() + str.slice(1);

        const words = str.split(/(?=[A-Z])/);

        return words.join(" ");
    }

    return (
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
            <Link underline="hover" to="/" component={RouterLink}>
                Home
            </Link>
            {pathnames.map((value, index) => {
                const last = index === pathnames.length - 1;
                const to = `/${pathnames.slice(0, index + 1).join("/")}`;

                return last ? (
                    <Typography key={to}>{formatString(value)}</Typography>
                ) : (
                    <Link
                        underline="hover"
                        to={to}
                        key={to}
                        component={RouterLink}
                    >
                        {formatString(value)}
                    </Link>
                );
            })}
        </Breadcrumbs>
    );
}

export default Breadcrumb;

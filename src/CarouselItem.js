import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const Index = ({ click, children, ...props }) => {
  return (
    <Card {...props} onClick={click}>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default Index;

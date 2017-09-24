<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title><?= isset($title) ? $title : 'OO ...' ?> - Manage</title>
    <link rel="stylesheet" href="/assets/lib/bootswatch/paper/bootstrap.min.css">
</head>
<body>
    <nav class="navbar navbar-default">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-4" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="/manage/">Books Manage</a>
        </div>
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-4">
          <ul class="nav navbar-nav">
            <li>
              <a href="/manage/"><i class="glyphicon glyphicon-dashboard" aria-hidden="true"></i> Dashboard</a>
            </li>
            <li>
              <a href="/manage/?act=createBook"><i class="glyphicon glyphicon-plus" aria-hidden="true"></i> Create Book</a>
            </li>
            <li>
              <a href="/manage/?act=checkRepo"><i class="glyphicon glyphicon-download" aria-hidden="true"></i> Update Repo</a>
            </li>
          </ul>

          <ul class="nav navbar-nav navbar-right">
            <li>
              <a href="/"><i class="glyphicon glyphicon-home" aria-hidden="true"></i> Home</a>
            </li>
            <li>
              <a href="/manage/?act=logout"><i class="glyphicon glyphicon-log-out" aria-hidden="true"></i> Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="container">
        <div class="row">
          <?php if ($error): ?>
            <div class="col-xs-12">
                <div class="alert alert-danger" role="alert">
                  <strong>Danger!</strong> <?= $error ?>
                </div>
            </div>
          <?php endif; ?>
          {_CONTENT_}
        </div>
    </div>
</body>
</html>

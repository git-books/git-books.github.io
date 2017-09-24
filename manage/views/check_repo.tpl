<div class="col-xs-12">
    <div class="page-header">
      <h1>Repo info<small>Subtext for header</small></h1>
    </div>

  <div class="panel panel-default">
    <div class="panel-heading">
      <h3 class="panel-title">Repo info</h3>
    </div>
    <div class="panel-body">
      <form class="form-inline" method="get" action="/manage/">
        <input type="hidden" name="act" value="checkRepo">
        <div class="form-group">
          <label>Command</label>
          <?php foreach ($commands as $name): ?>
            <label class="radio-inline">
              <input type="radio" name="cmd" id="<?=$name ?>" value="<?=$name ?>" <?php if ($cmd === $name): ?>checked<?php endif ?>>
              <?=$name ?>
            </label>
          <?php endforeach ?>
        </div>
        <button type="submit" class="btn btn-sm btn-primary"><i class="glyphicon glyphicon-send" aria-hidden="true"></i> Submit</button>
      </form>

      <div class="well well-sm">
        <pre><?= $output; ?></pre>
      </div>
    </div>
  </div>
</div>

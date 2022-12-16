<?php

namespace App\DTO;

class TodosIds
{
    private array $ids ;
      //constructor
     public function __construct(array $ids)
        {
            $this->ids = $ids;
        }
    //getter and setter
    public function addId(string $id):void
    {
        $this->ids[] = $id;
    }

    public function getIds():array
    {
        return $this->ids;
    }

}